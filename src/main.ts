import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get('ConfigService');

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Microservice projects')
        .setDescription(
          'Microservice for users projects managing, editing and storing.',
        )
        .setVersion('1.0')
        .build(),
    ),
  );

  await app.listen(config.get('PORT'));
}
bootstrap();
