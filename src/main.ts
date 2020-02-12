import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({logger: true}));
  app.enableCors();
  app.use(helmet());
  await app.listen(parseInt(process.env.PORT, 10) || 3000, '0.0.0.0');
}
bootstrap();
