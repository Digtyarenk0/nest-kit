import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'nestjs-pino';

import configuration from 'config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { CommonModule } from './common/common.module';

const configImports = [
  LoggerModule.forRoot(),
  ScheduleModule.forRoot(),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
  CacheModule.register({
    isGlobal: true,
    store: redisStore,
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  }),
  BullModule.forRoot({
    url: process.env.REDIS_URL,
    redis: {
      password: process.env.REDIS_PASSWORD,
    },
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['src/**/*.entity.ts'],
    logging: ['error'],
    maxQueryExecutionTime: 100,
  }),
];

@Module({
  imports: [...configImports, CommonModule],
})
export class AppModule {}
