import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JWTConfig } from '../configs/jwt.config';
import { JWTTokensLifeTime } from '../constants';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtConfig: JWTConfig,
    private readonly jwtService: NestJwtService,
  ) {}

  async generateTokens<T extends object>(payload: T) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: JWTTokensLifeTime.accessToken,
        secret: this.jwtConfig.accessSecret,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: JWTTokensLifeTime.refreshToken,
        secret: this.jwtConfig.refreshSecret,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken<T>(token: string): Promise<T> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfig.accessSecret,
      });
      return payload;
    } catch {
      return null;
    }
  }

  async verifyRefreshToken<T>(token: string): Promise<T> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfig.refreshSecret,
      });
      return payload;
    } catch {
      return null;
    }
  }
}
