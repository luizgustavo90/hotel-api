import { Room } from '../main/entities/Room'
import {
  CreateRoomDTO,
  ExtendedPaginateParams,
  PaginateParams,
  RoomPaginateProperties,
} from '../main/entities/types'

export interface IRoomRepository {
  create({ type, value, status, createdAt }: CreateRoomDTO): Promise<Room>
  save(room: Room): Promise<Room>
  findAll({ page, skip, take }: PaginateParams): Promise<RoomPaginateProperties>
  findByParams({
    page,
    skip,
    take,
    type,
    status,
    rommNo,
  }: ExtendedPaginateParams): Promise<RoomPaginateProperties>
  findByNumber(rommNo: number): Promise<Room | null>
  findByType(type: string): Promise<Room | null>
  findByStatus(status: string): Promise<Room | null>
  delete(room: Room): Promise<void>
}
