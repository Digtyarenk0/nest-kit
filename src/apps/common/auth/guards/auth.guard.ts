import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtAuthService,
    // private readonly _userRepo: IUsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAccessToken(token);
      if (!payload) throw new UnauthorizedException('Invalid token');
      // const user = await this._userRepo.getOneById(payload.id);
      // if (!user) throw new UnauthorizedException('User is not registered.');

      request['user'] = {};
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export const UseAuthGuard = () => {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth('access-token'));
};
