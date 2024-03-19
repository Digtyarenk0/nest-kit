import { mainnetConfig } from './mainnet';
import { testnetConfig } from './testnet';
import { AppConfig, ENV } from './type';

export const getAppConfig = (net = ENV.testnet): AppConfig => {
  if (net !== ENV.mainnet && net !== ENV.testnet)
    throw new Error(`NEST_CONFIG must be ${ENV.mainnet} or ${ENV.testnet}`);

  const app: AppConfig = net === ENV.mainnet ? mainnetConfig : testnetConfig;

  return app;
};

export default (): { app: AppConfig } => {
  const currentNetwork = process.env.NEST_CONFIG || ENV.testnet;

  if (currentNetwork !== ENV.mainnet && currentNetwork !== ENV.testnet)
    throw new Error(`NEST_CONFIG must be ${ENV.mainnet} or ${ENV.testnet}`);

  const app: AppConfig =
    currentNetwork === ENV.mainnet ? mainnetConfig : testnetConfig;

  return {
    app,
  };
};
