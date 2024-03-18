export enum ENV {
  testnet = 'testnet',
  mainnet = 'mainnet',
}

export interface AppConfig {
  name: string;
  net: ENV;
}

export interface ConfigServiceApp {
  app: AppConfig;
}
