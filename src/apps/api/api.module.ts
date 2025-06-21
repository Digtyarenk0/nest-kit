import { Module } from '@nestjs/common';

import { CommonModule } from 'shared/common/common.module';

import { UserModule } from '../../shared/infrastructure/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
@Module({
  imports: [CommonModule, UserModule, AuthModule, ProjectsModule],
})
export class ApiModule {}
