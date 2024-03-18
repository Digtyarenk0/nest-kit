import { ConfigAppType } from './config.type';

export default (): ConfigAppType => ({
  logs: JSON.parse(process.env.LOGS),
  frontDomain: process.env.FRONT_DOMAIN,
  port: Number(process.env.PORT) || 5000,
});
