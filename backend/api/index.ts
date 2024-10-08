import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

export default async (req, res) => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    validatorPackage: require('@nestjs/class-validator'),
    transformerPackage: require('@nestjs/class-transformer')
  }));
  app.enableCors();

  await app.init();
  
  // Forward the request to NestJS
  await app.getHttpAdapter().getInstance().handle(req, res);
};
