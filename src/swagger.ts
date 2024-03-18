import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { InitModule } from 'app/init/init.module';

const include = [InitModule];

export class Swagger {
  static init(app: INestApplication) {
    const options: SwaggerDocumentOptions = {
      include,
      deepScanRoutes: false,
    };
    const config = new DocumentBuilder()
      .setTitle('Swagger')
      .setVersion('0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
