import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { User } from 'shared/database/entities/users/user.entity';
import { IUserRepository } from 'shared/database/repositories/user/user.repo.interface';

import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: IUserRepository) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this._userRepository.findOneByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this._userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
    });
    return user;
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this._userRepository.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
