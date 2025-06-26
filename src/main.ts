import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config. do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Desafio Backend')
    .setDescription('API para gerenciamento de livros e autores')
    .setVersion('1.0')
    // .addTag('biblioteca')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota da documentação: /api

  // Habilita a validação globalmente usando class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro se propriedades extras forem enviadas
      transform: true, // Transforma o payload para o tipo do DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();
