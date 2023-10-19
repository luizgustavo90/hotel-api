import { User } from './User'

export type CreateUserDTO = {
  name: string
  department: string
  email: string
  password: string
}
export type LoginUserDTO = {
  email: string
  password: string
}

export type LoginUserReturn = {
  name: string
  department: string
  email: string
  token: string
}

export type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type UsersPaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: User[]
}

export type UpdateUserDTO = {
  id: string
  name: string
  department: string
  email: string
  password: string
}
