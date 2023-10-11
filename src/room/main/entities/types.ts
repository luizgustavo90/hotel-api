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

export type PaginateParamsFilter = {
  page: number
  limit: number
  rommNo?: number | undefined
  status?: string | undefined
  type?: string | undefined
}

export interface ExtendedPaginateParams
  extends PaginateParams,
    PaginateParamsFilter {}
