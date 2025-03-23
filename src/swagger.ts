import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const include = []; // Modules array

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
