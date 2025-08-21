import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const typeOrmConfig =
          configService.get<TypeOrmModuleOptions>('typeorm');

        if (!typeOrmConfig) {
          throw new Error('Missing TypeORM configuration');
        }
        return typeOrmConfig;
      },
    }),
    //...Other modules
  ],
  //other configs
})
export class AppModule {}
