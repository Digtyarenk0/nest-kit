import { IsNotEmpty } from 'class-validator';

import { Config } from 'libs/config/decorators';

@Config()
export class JWTConfig {
  @IsNotEmpty()
  accessSecret: string = process.env.JWT_ACCESS_SECRET;

  @IsNotEmpty()
  refreshSecret: string = process.env.JWT_REFRESH_SECRET;
}
