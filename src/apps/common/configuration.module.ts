import { Global, Module } from '@nestjs/common';

import { JWTConfig } from './auth/configs/jwt.config';

@Global()
@Module({
  providers: [JWTConfig],
  exports: [JWTConfig],
})
export class ConfigurationModule {}
