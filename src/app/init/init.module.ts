import { Global, Module } from '@nestjs/common';
import { InitService } from './service/init.service';
import { InitController } from './controller/init.controller';

@Module({
  imports: [],
  exports: [],
  providers: [InitService],
  controllers: [InitController],
})
export class InitModule {}
