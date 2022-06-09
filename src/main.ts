import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path, { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'event-images'), {
    index: false,
    prefix: '/event-images',
});
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, function () {
    console.log('App listening on port');
  });
}
bootstrap();
