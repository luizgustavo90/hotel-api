import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Guest } from '@guest/main/entities/Guest'

export const dataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Guest],
  migrations: [],
})
