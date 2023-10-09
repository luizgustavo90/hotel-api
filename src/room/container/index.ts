import { container } from 'tsyringe'
import { CreateRoomController } from '../controllers/create-room-controller'
import { IRoomRepository } from '../repositories/IRoomRepository'
import { RoomRepository } from '../repositories/RoomReposisory'

container.registerSingleton<IRoomRepository>('RoomRepository', RoomRepository)

container.registerSingleton('CreateRoomController', CreateRoomController)
