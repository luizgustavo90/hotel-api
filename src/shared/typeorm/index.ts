import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Guest } from '@guest/main/entities/Guest'
import { CreateTableGuest1696422313799 } from '@shared/typeorm/migrations/1696422313799-CreateTableGuest'

export const dataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Guest],
  migrations: [CreateTableGuest1696422313799],
})
