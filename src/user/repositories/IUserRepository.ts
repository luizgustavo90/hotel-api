import { User } from '@user/main/entities/User'
import {
  CreateUserDTO,
  PaginateParams,
  UsersPaginateProperties,
} from '../main/entities/types'

export interface IUserRepository {
  create({ name, department, email, password }: CreateUserDTO): Promise<User>
  save(user: User): Promise<User>
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginateProperties>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  delete(user: User): Promise<void>
  findByToken(token: string): Promise<User | null>
}
