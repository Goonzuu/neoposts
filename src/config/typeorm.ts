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
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  database: process.env.DB_NAME ?? 'appdb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => configuration);
export const connectionSource = new DataSource(
  configuration as DataSourceOptions,
);
