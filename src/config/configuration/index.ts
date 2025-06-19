import dotenv from 'dotenv';

import { ConfigAppType } from './config.type';

dotenv.config();

const env = process.env;

export default (): ConfigAppType => ({
  port: Number(env.PORT) || 5001,
  logs: env.LOGS ? JSON.parse(env.LOGS) : { level: env.LOG_LEVEL },
  jwt: {
    secret: env.JWT_SECRET,
    accessExpires: env.JWT_ACCESS_EXPIRES || '15m',
    refreshExpires: env.JWT_REFRESH_EXPIRES || '7d',
  },
  redis: {
    host: env.REDIS_HOST || 'localhost',
    port: Number(env.REDIS_PORT) || 6379,
    password: env.REDIS_PASSWORD || undefined,

    url: `redis://${env.REDIS_HOST || 'localhost'}:${env.REDIS_PORT || 6379}`,
  },
  database: {
    connection: {
      type: 'postgres',
      host: env.POSTGRES_HOST,
      database: env.POSTGRES_DB,
      port: parseInt(env.POSTGRES_PORT),
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      migrationsTableName: 'migrations',
      entities: [`dist/database/entities/**/*.entity.js`],
      migrations: [`dist/database/migrations/**/*-migration.js`],
      logging: ['error'],
      maxQueryExecutionTime: 100,
      synchronize: false,
    },
  },
});
