import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT')
  await app.listen(port, () =>
    logger.log(`App started** on port: ${port} 🚀`),);
}
bootstrap();
