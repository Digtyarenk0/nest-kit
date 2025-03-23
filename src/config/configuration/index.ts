import { ConfigAppType } from './config.type';

export default (): ConfigAppType => ({
  port: Number(process.env.PORT) || 5001,
  logs: JSON.parse(process.env.LOGS),
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES || '15m',
  },
});
