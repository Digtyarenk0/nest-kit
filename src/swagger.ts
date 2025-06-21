import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { apiReference } from '@scalar/nestjs-api-reference';

export const setupOpenApiReference = (
  app: INestApplication,
  config: ReturnType<DocumentBuilder['build']>,
) => {
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/swagger',
    apiReference({
      theme: 'purple',
      spec: {
        content: document,
      },
    }),
  );
};

export class Swagger {
  static init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setVersion('0.1')
      .addTag('Afridax')
      .build();
    setupOpenApiReference(app, config);
  }
}
