import { Guest } from './Guest'

export type CreateGuestDTO = {
  name: string
  document: string
  email: string
  phone: string
  age: number
}

export type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type GuestPaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: Guest[]
}
