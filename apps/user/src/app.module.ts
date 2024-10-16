import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { UserModule } from './user/user.module';
import mysqlConfig from './config/mysql.config';
import { TempUser } from './user/entities/temp-user.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const userTypeOrmModuleOptions: TypeOrmModuleOptions = {
          name: 'user',
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          database: configService.get('mysql.database'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          autoLoadEntities: true,
          logging: true,
          entities: [User, CareerCategory, PositionCategory, ProjectCategory, TempUser],
          synchronize: process.env.NODE_ENV === 'development',
        };
        return userTypeOrmModuleOptions;
      },
      dataSourceFactory: async (option?) => {
        if (!option) {
          throw new Error('Option is required');
        }
        return addTransactionalDataSource(new DataSource(option));
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
