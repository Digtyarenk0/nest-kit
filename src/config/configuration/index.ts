import dotenv from 'dotenv';

import { ConfigAppType } from './config.type';

dotenv.config();

const env = process.env;

export default (): ConfigAppType => ({
  appURL: env.APP_URL || 'http://localhost:5173',
  port: Number(env.PORT) || 5001,
  logs: env.LOGS ? JSON.parse(env.LOGS) : { level: env.LOG_LEVEL },
});
