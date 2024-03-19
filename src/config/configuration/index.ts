import { ConfigAppType } from './config.type';

export default (): ConfigAppType => ({
  port: Number(process.env.PORT) || 5001,
});
