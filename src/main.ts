import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

const ddOptions = {
  path: true,
  base_url: true,
  method: true,
  protocol: true,
  response_code: true,
  tags: ['env:prod'],
};

const connectDatadog = require('connect-datadog')(ddOptions);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(connectDatadog);
  await app.listen(parseInt(process.env.PORT, 10) || 3000, '0.0.0.0');
}
bootstrap();
