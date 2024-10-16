import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  CareerCategory,
  PositionCategory,
  PostCategory,
  ProjectCategory,
  StackCategory,
} from '@publicData/entities';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { PublicDataModule } from './public-data/public-data.module';
import mysqlConfig from './config/mysql.config';

console.log(__dirname);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const publicDataTypeOrmModuleOptions: TypeOrmModuleOptions = {
          name: 'public-data',
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          database: configService.get('mysql.database'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          autoLoadEntities: true,
          entities: [
            CareerCategory,
            StackCategory,
            PostCategory,
            PositionCategory,
            ProjectCategory,
          ],
          logging: true,
          synchronize: process.env.NODE_ENV === 'development',
        };
        return publicDataTypeOrmModuleOptions;
      },

      dataSourceFactory: async (option?) => {
        if (!option) {
          throw new Error('Option is required');
        }

        return addTransactionalDataSource(new DataSource(option));
      },
    }),

    PublicDataModule,
  ],
})
export class AppModule {}
