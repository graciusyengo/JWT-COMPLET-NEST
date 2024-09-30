import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Validate } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )
  await app.listen(3000);
  console.log(process.env.JWT_SECRET)

  console.log(process.env.DB_TYPE)
  console.log(process.env.DB_PASSWORD)


}
bootstrap();
