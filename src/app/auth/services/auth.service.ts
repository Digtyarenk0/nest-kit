import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { UserService } from 'app/user/services/user.service';
import { TokenDto } from '../dto/token.dto';
import { LoginDto } from 'app/user/dto/login.dto';
import { AUTH_TOKENS_CONFIG } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const user = await this.userService.validateUser(loginDto);

    const payload = { sub: user.id, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.accessExpires'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: AUTH_TOKENS_CONFIG.refreshTokenExpiresIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
