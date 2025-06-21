export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  url: string;
}

export interface ConfigAppType {
  port: number;
  appURL: string;
  logs: boolean;
}
