import {
  Logger as NestLogger,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

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

  await app.listen(configService.get('port'), () => {
    console.log(`Server started on port: ${configService.get('port')}`);
    console.log(`Swagger: ${configService.get('port')}/swagger`);
  });
}
bootstrap();
