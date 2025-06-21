import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import * as Express from 'express';
import { User } from 'shared/database/entities/users/user.entity';
import { IUserRepository } from 'shared/database/repositories/user/user.repo.interface';
import { LoginDto } from 'shared/infrastructure/user/dto/login.dto';

import { JwtAuthService } from 'shared/common/auth/services/jwt.service';
import { DAY } from 'shared/common/redis/constants';
import { CacheService } from 'shared/common/redis/service/cache.service';

import { UserService } from 'shared/infrastructure/user/services/user.service';

import { RegisterDto } from '../../../../shared/infrastructure/user/dto/register.dto';
import { AuthLoginRes, TokenPayload } from '../types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtRefreshTokenCache: number = DAY * 7;

  constructor(
    private readonly cacheService: CacheService,
    private readonly jwtAuthService: JwtAuthService,

    private readonly userService: UserService,
    private readonly _userRepository: IUserRepository,
  ) {}

  async register(
    registerDto: RegisterDto,
    res: Express.Response,
  ): Promise<AuthLoginRes> {
    try {
      await this.userService.register(registerDto);
    } catch (error) {
      this.logger.log(
        `Error registration reason: ${error?.message || JSON.stringify(error)}`,
      );
      throw new BadRequestException('Unknown error while registering user');
    }
    return await this.login(registerDto, res);
  }

  async login(
    loginDto: LoginDto,
    res: Express.Response,
  ): Promise<AuthLoginRes> {
    try {
      const user = await this.userService.validateUser(loginDto);

      const userTokenData = this.getTokenPayload(user);
      const { refreshToken, accessToken } = {
        refreshToken: '',
        accessToken: '',
      };
      await this.jwtAuthService.generateTokens<TokenPayload>(userTokenData);
      this.setRefreshTokenCookie(res, refreshToken);

      await this.cacheService.set(
        this.getRefreshTokenCacheKey(user.id),
        refreshToken,
        this.jwtRefreshTokenCache,
      );

      return { accessToken };
    } catch (error) {
      this.logger.log(
        `Error login reason: ${error?.message || JSON.stringify(error)}`,
      );
      throw new BadRequestException('Unknown error while login user');
    }
  }

  async refresh(
    request: Express.Request,
    response: Express.Response,
  ): Promise<AuthLoginRes> {
    const refreshToken = request.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload =
        await this.jwtAuthService.verifyRefreshToken<TokenPayload>(
          refreshToken,
        );
      const user = await this._userRepository.findOneById(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const chacheKey = this.getRefreshTokenCacheKey(user.id);
      const cachedRefreshToken = await this.cacheService.get(chacheKey);
      if (!cachedRefreshToken || cachedRefreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const userTokenData = this.getTokenPayload(user);
      const tokens = {
        refreshToken: '',
        accessToken: '',
      };
      await this.jwtAuthService.generateTokens<TokenPayload>(userTokenData);
      await this.cacheService.set(chacheKey, tokens.refreshToken, DAY * 7);
      this.setRefreshTokenCookie(response, tokens.refreshToken);
      return {
        accessToken: tokens.accessToken,
      };
    } catch (error) {
      this.logger.error(`Refresh tokens error: ${error}`);
      throw new UnauthorizedException('Failed to refresh tokens');
    }
  }

  private setRefreshTokenCookie(
    response: Express.Response,
    refreshToken: string,
  ): void {
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
      maxAge: DAY * 7,
    });
  }

  private getTokenPayload(user: User): TokenPayload {
    return { id: user.id, email: user.email };
  }

  private getRefreshTokenCacheKey(userId: string): string {
    return `refresh-token-${userId}`;
  }
}
