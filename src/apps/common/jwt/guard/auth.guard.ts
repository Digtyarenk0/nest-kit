import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from 'database/entities/users/user.entity';

import { JWTService } from '../service/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JWTService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      const payload = await this.jwtService.verifyAccessToken<{ id: string }>(
        token,
      );
      if (!payload?.id) throw new UnauthorizedException('Invalid token');
      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });
      if (!user) throw new UnauthorizedException('User is not registered.');

      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export const UseAuthGuard = () => {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth('access-token'));
};
