import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

export default async (req, res) => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  try {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return res.status(500).send('Database connection error');
  }

  await app.init();
  
  // Forward the request to NestJS
  await app.getHttpAdapter().getInstance().handle(req, res);
};
