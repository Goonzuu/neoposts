import { registerAs, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

config();

const configService = new ConfigService();
const port = parseInt(configService.get('DATABASE_PORT') ?? '5432');

const configuration = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: port,
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => configuration);
export const connectionSource = new DataSource(
  configuration as DataSourceOptions,
);
