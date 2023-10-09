import { Room } from '../main/entities/Room'
import {
  CreateRoomDTO,
  PaginateParams,
  RoomPaginateProperties,
} from '../main/entities/types'

export interface IRoomRepository {
  create({ type, value, status, createdAt }: CreateRoomDTO): Promise<Room>
  save(room: Room): Promise<Room>
  findAll({ page, skip, take }: PaginateParams): Promise<RoomPaginateProperties>
  findByNumber(roomNo: number): Promise<Room | null>
  findByType(type: string): Promise<Room | null>
  delete(room: Room): Promise<void>
}
