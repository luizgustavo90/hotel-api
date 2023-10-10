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

interface FilterParams {
  type?: string
  status?: string
  roomNo?: number
  page: number
  limit: number
}

export interface ExtendedPaginateParams extends PaginateParams, FilterParams {}
