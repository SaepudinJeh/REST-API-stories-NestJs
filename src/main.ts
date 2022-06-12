import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(compression());
  app.use(helmet.default());
  app.use(csurf());
  app.enableCors({ origin: '*' });

  const configSwagger = new DocumentBuilder()
    .addServer('http://localhost:3000')
    .setTitle('The REST API Stories')
    .setDescription(
      'Everyone can print their own history and everyone has rights for himself and what he will do for himself in the future',
    )
    .setVersion('0.5.0')
    .addTag('stories')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(3000);
}
bootstrap();
