import { Room } from './Room'

export type CreateRoomDTO = {
  type: string
  value: number
  status: string
  createdAt: string
}

export type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type RoomPaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: Room[]
}
