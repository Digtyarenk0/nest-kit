import {
  Logger as NestLogger,
  NestApplicationOptions,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';

import { MainModule } from 'apps/main.module';

import { Swagger } from './swagger';

async function bootstrap() {
  const appModuleParams: NestApplicationOptions = {
    bufferLogs: true,
  };

  const app = await NestFactory.create(MainModule, appModuleParams);

  Swagger.init(app);

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get('appURL'),
    credentials: true,
  });

  NestLogger.log(`App logs: ${configService.get('logs')}`, 'Config');
  // if (configService.get('logs')) {
  //   app.useLogger(app.get(Logger));
  // }

  const logger = new Logger('App');
  await app.listen(configService.get('port'), async () => {
    const url = await app.getUrl();
    logger.log(`Starting application`, {
      port: configService.get('port'),
      url,
      swagger: url + '/swagger',
      nodeVersion: process.version,
    });
  });
}
bootstrap();
