import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  app.use(compression());
  app.use(helmet.default());
  // app.use(csurf());
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  });

  const configSwagger = new DocumentBuilder()
    .addServer('http://localhost:3000')
    .addServer('https://story-next-generation.herokuapp.com')
    .setTitle('The REST API Stories')
    .setDescription(
      'Everyone can print their own history and everyone has rights for himself and what he will do for himself in the future',
    )
    .setVersion('0.5.0')
    .addBearerAuth()
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);

  const port: number = parseInt(`${process.env.PORT}`) || 3000;

  await app.listen(port);
}
bootstrap();
