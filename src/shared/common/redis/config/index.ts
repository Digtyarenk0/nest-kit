import { IsOptional } from 'class-validator';

import { Config } from 'libs/config/decorators';

@Config()
export class CacheConfig {
  @IsOptional()
  host: string = process.env.REDIS_HOST || 'localhost';

  @IsOptional()
  port: number = Number(process.env.REDIS_PORT) || 6379;

  @IsOptional()
  username: string = process.env.REDIS_USER;

  @IsOptional()
  password: string = process.env.REDIS_PASSWORD;
}
