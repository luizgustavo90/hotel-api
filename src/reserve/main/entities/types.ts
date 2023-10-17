import { Reserve } from './Reserve'

export type CreateCheckInDTO = {
  type?: string
  rommNo: number
  guestId: string
  stay?: number
  checkIn?: string
  checkOut?: string
  totalCost?: number
}

export type FinishCheckOutDTO = {
  guestId: string
  rommNo: number
}

export type CheckOutDTO = {
  message: string
  guestId: string
  name: string
  email: string
  phone: string
  roomNo: number
  checkIn: string
  checkOut: string
  costDetail: string
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
