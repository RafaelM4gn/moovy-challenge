import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('Description of the Movie API')
    .setVersion('1.0')
    .addTag('movie')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Validation configuration
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
