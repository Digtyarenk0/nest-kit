import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from 'shared/database/database.module';

import { CommonModule } from '../shared/common/common.module';

import { ConfigurationModule } from '../shared/configuration/configuration.module';
import { ApiModule } from './api/api.module';
import { ConsumerModule } from './consumers/consumer.module';
import { CronModule } from './cron/cron.module';

const configImports = [LoggerModule.forRoot(), ScheduleModule.forRoot()];

const appModules = [
  DatabaseModule,
  ConfigurationModule,
  ApiModule,
  CronModule,
  ConsumerModule,
  CommonModule,
];
@Module({
  imports: [...configImports, ...appModules],
})
export class MainModule {}
