import {
  NestApplicationOptions,
  Logger as NestLogger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

import { AppModule } from 'app/app.module';

import { Swagger } from './swagger';

async function bootstrap() {
  const appModuleParams: NestApplicationOptions = {
    bufferLogs: true,
  };

  const app = await NestFactory.create(AppModule, appModuleParams);

  Swagger.init(app);

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('frontDomain'),
    credentials: true,
  });

  NestLogger.log(`App logs: ${configService.get('logs')}`, 'Config');
  if (configService.get('logs')) {
    app.useLogger(app.get(Logger));
  }

  await app.listen(configService.get('port'), () => {
    console.log(`Server started on port: ${configService.get('port')}`);
    console.log(`Swagger: ${configService.get('port')}/swagger`);
  });
}
bootstrap();
