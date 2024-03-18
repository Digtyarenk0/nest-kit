import { Global, Module } from '@nestjs/common';
import { InitService } from './service/init.service';
import { InitController } from './controller/init.controller';

@Global()
@Module({
  imports: [],
  exports: [],
  providers: [InitService],
  controllers: [InitController],
})
export class InitModule {}
