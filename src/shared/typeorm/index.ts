import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Guest } from '@guest/main/entities/Guest'
import { CreateTableGuest1696422313799 } from '@shared/typeorm/migrations/1696422313799-CreateTableGuest'
import { CreateRoomsTable1696515698764 } from '@shared/typeorm/migrations/1696515698764-CreateRoomsTable'
import { AddRoomNoToGuest1696532556860 } from '@shared/typeorm/migrations/1696532556860-AddRoomNoToGuest'
import { UpdateParamsToNotUnique1696946763539 } from './migrations/1696946763539-UpdateParamsToNotUnique'
import { Room } from 'src/room/main/entities/Room'
export const dataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Guest, Room],
  migrations: [
    CreateTableGuest1696422313799,
    CreateRoomsTable1696515698764,
    AddRoomNoToGuest1696532556860,
    UpdateParamsToNotUnique1696946763539,
  ],
})
