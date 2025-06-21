import { Provider } from '@nestjs/common';

import { User } from 'shared/database/entities/users/user.entity';

import { UsersRepository } from './user.repo';

export interface ICreateUser {
  email: string;
  password: string;
}

export abstract class IUserRepository {
  abstract findOneById(id: string): Promise<User | null>;
  abstract findOneByEmail(email: string): Promise<User | null>;
  abstract create(user: ICreateUser): Promise<User>;
}

export const USER_REPOSITORY: Provider = {
  provide: IUserRepository,
  useClass: UsersRepository,
};
