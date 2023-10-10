import { container } from 'tsyringe'
import { CreateRoomController } from '../controllers/create-room-controller'
import { ListRoomByParamController } from '@room/controllers/list-room-by-param-controller'
import { ListRoomController } from '@room/controllers/list-room-controller'
import { IRoomRepository } from '../repositories/IRoomRepository'
import { RoomRepository } from '../repositories/RoomReposisory'

container.registerSingleton<IRoomRepository>('RoomRepository', RoomRepository)

container.registerSingleton('CreateRoomController', CreateRoomController)
container.registerSingleton(
  'ListRoomByParamController',
  ListRoomByParamController,
)
container.registerSingleton('ListRoomController', ListRoomController)
