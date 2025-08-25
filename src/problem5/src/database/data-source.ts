import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '123456',
  database: process.env.DB_NAME ?? 'resourceDB',
  entities: [__dirname + '/../entities/*.{js,ts}'], // ✅ load js & ts
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: false, // true for dev only
  logging: false,
});