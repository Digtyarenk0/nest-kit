import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';

import { UserService } from 'app/user/services/user.service';

import { LoginDto } from 'app/user/dto/login.dto';

import { RegisterDto } from '../../user/dto/register.dto';
import { AUTH_TOKENS_CONFIG } from '../constants';
import { AuthLoginRes } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    registerDto: RegisterDto,
    res: Response,
  ): Promise<AuthLoginRes> {
    await this.userService.register(registerDto);
    return await this.login(registerDto, res);
  }

  async login(loginDto: LoginDto, res: Response): Promise<AuthLoginRes> {
    const user = await this.userService.validateUser(loginDto);

    const payload = { sub: user.id, email: user.email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.accessExpires'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.refreshExpires'),
      }),
    ]);

    this.setRefreshTokenCookie(res, refreshToken);
    return { accessToken };
  }

  setRefreshTokenCookie(response: Response, refreshToken: string): void {
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
      maxAge: AUTH_TOKENS_CONFIG.refreshTokenExpiresIn,
    });
  }
}
