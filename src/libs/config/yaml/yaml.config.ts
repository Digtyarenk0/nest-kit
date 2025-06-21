import { config } from 'dotenv';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

import { AppEnvironment } from 'shared/types/app-environment';

config();

export interface YamlWebhook {
  WEBHOOK: {
    ACTIVITY: {
      URL: string;
    };
  };
}

export interface IYamlConfig {
  WEBHOOK: YamlWebhook;
}

export const STAGE = process.env.ENVIRONMENT as AppEnvironment;

const configFiles = {
  [AppEnvironment.DEVELOPMENT]: 'config.dev.yaml',
  [AppEnvironment.STAGING]: 'config.staging.yaml',
  [AppEnvironment.PRODUCTION]: 'config.prod.yaml',
};

if (!STAGE) throw Error('Yaml unknown stage env');

const YAML_CONFIG_FILENAME = configFiles[STAGE];

export const YAML_CONFIG = yaml.load(
  readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
) as IYamlConfig;
