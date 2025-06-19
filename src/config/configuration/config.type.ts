import { DataSourceOptions } from 'typeorm';

export interface JwtConfig {
  secret: string;
  accessExpires: string;
  refreshExpires: string;
}

export interface Database {
  connection: DataSourceOptions;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  url: string;
}
export interface ConfigAppType {
  port: number;
  logs: boolean;
  jwt: JwtConfig;
  redis: RedisConfig;
  database: Database;
}
