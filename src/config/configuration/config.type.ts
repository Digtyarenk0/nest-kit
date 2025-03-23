export interface ConfigAppType {
  port: number;
  logs: boolean;
  jwt: {
    secret: string;
    accessExpires: string;
    refreshExpires: string;
  };
}
