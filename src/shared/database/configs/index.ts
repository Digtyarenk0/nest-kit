import { IsNotEmpty } from 'class-validator';

import { Config } from 'libs/config/decorators';

@Config()
export class DatabaseConfig {
  @IsNotEmpty()
  username: string = process.env.POSTGRES_USER;

  @IsNotEmpty()
  password: string = process.env.POSTGRES_PASSWORD;

  @IsNotEmpty()
  port: number = Number(process.env.POSTGRES_PORT);

  @IsNotEmpty()
  host: string = process.env.POSTGRES_HOST;

  @IsNotEmpty()
  database: string = process.env.POSTGRES_DB;
}
