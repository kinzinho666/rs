import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Tournament } from './entities/Tournament';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Tournament],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
});