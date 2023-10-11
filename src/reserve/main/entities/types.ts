import { Reserve } from './Reserve'

export type CreateCheckInDTO = {
  type?: string
  rommNo: number
  guestId: string
  checkIn?: string
}

export type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type ReservePaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: Reserve[]
}
