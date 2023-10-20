import { dataSource } from '@shared/typeorm'
import { User } from '../main/entities/User'
import { Repository } from 'typeorm'
import {
  PaginateParams,
  UsersPaginateProperties,
  CreateUserDTO,
} from '../main/entities/types'
import { IUserRepository } from './IUserRepository'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User)
  }
  async create({
    name,
    department,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, department, email, password })
    return this.repository.save(user)
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginateProperties> {
    const [user, count] = await this.repository
      .createQueryBuilder('u')
      .skip(skip)
      .take(take)
      .getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: user,
    }
    return result
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }
  async delete(user: User): Promise<void> {
    await this.repository.remove(user)
  }
  async findByToken(token: string): Promise<User | null> {
    return this.repository.findOneBy({ token })
  }
}
