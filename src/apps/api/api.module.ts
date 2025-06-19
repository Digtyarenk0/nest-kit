import { Module } from '@nestjs/common';

import { CommonModule } from 'apps/common/common.module';

import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, UserModule, AuthModule, ProjectsModule],
})
export class ApiModule {}
