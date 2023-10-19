import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Guest } from '@guest/main/entities/Guest'
import { User } from '@user/main/entities/User'
import { Room } from 'src/room/main/entities/Room'
import { Reserve } from '@reserve/main/entities/Reserve'
import { CreateTableGuest1696422313799 } from '@shared/typeorm/migrations/1696422313799-CreateTableGuest'
import { CreateRoomsTable1696515698764 } from '@shared/typeorm/migrations/1696515698764-CreateRoomsTable'
import { AddRoomNoToGuest1696532556860 } from '@shared/typeorm/migrations/1696532556860-AddRoomNoToGuest'
import { UpdateParamsToNotUnique1696946763539 } from './migrations/1696946763539-UpdateParamsToNotUnique'
import { CreateTableReserve1697045489736 } from './migrations/1697045489736-CreateTableReserve'
import { AddColumnIdInReserve1697201989509 } from './migrations/1697201989509-AddColumnIdInReserve'
import { AlterTypeOfIdInReserve1697207160155 } from './migrations/1697207160155-AlterTypeOfIdInReserve'
import { AlterTypeOfGuestIdReverse1697207755517 } from './migrations/1697207755517-AlterTypeOfGuestIdReverse'
import { AddTotalCostInReserve1697481350478 } from './migrations/1697481350478-AddTotalCostInReserve'
import { CreateTableUser1697717953053 } from './migrations/1697717953053-CreateTableUser'
import { AddColumnToken1697738975897 } from './migrations/1697738975897-AddColumnToken'
import { AddDefaultValueToToken1697745028646 } from './migrations/1697745028646-AddDefaultValueToToken'

export const dataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Guest, Room, Reserve, User],
  migrations: [
    CreateTableGuest1696422313799,
    CreateRoomsTable1696515698764,
    AddRoomNoToGuest1696532556860,
    UpdateParamsToNotUnique1696946763539,
    CreateTableReserve1697045489736,
    AddColumnIdInReserve1697201989509,
    AlterTypeOfIdInReserve1697207160155,
    AlterTypeOfGuestIdReverse1697207755517,
    AddTotalCostInReserve1697481350478,
    CreateTableUser1697717953053,
    AddColumnToken1697738975897,
    AddDefaultValueToToken1697745028646,
  ],
})
