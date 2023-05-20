import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation configuration
  app.useGlobalPipes(new ValidationPipe());

  //OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('Moovy API')
    .setDescription('Api for moovy, Tarken Challenge')
    .setVersion('1.0')
    .addTag('Movies', 'Movie related endpoints')
    .addTag('Auth', 'Authentication related endpoints')
    .addTag('Users', 'Users related endpoints')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Validation configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3001);
}
bootstrap();
