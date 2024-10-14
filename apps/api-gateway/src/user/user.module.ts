import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,

    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.USER_HOST, // 'user-service'
            port: Number(process.env.USER_PORT),
          },
        });
      },
    },
  ],
})
export class UserModule {}
