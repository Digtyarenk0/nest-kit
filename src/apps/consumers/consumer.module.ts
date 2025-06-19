import { Module } from '@nestjs/common';

import { ProjectsProcessModule } from './projects/projects.module';

@Module({
  imports: [ProjectsProcessModule],
})
export class ConsumerModule {}
