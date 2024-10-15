import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = Number(process.env.CHAT_PORT);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'https://grabbme.store',
      port: PORT,
    },
  });

  await app.listen();

  console.info(`chat-service Running On ${PORT} for TCP`);
}
bootstrap();
