import { dataSource } from '@shared/typeorm'
import { Guest } from '../main/entities/Guest'
import { Repository } from 'typeorm'
import {
  GuestPaginateProperties,
  CreateGuestDTO,
  PaginateParams,
} from '../main/entities/types'
import { IGuestRepository } from './IGuestRepository'

export class GuestRepository implements IGuestRepository {
  private repository: Repository<Guest>

  constructor() {
    this.repository = dataSource.getRepository(Guest)
  }
  async create({
    name,
    document,
    email,
    phone,
    age,
  }: CreateGuestDTO): Promise<Guest> {
    const guest = this.repository.create({ name, document, email, phone, age })
    return this.repository.save(guest)
  }

  async save(guest: Guest): Promise<Guest> {
    return this.repository.save(guest)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<GuestPaginateProperties> {
    const [user, count] = await this.repository
      .createQueryBuilder('g')
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

  async findByEmail(email: string): Promise<Guest | null> {
    return this.repository.findOneBy({ email })
  }

  async findById(id: string): Promise<Guest | null> {
    return this.repository.findOneBy({ id })
  }
  async delete(guest: Guest): Promise<void> {
    await this.repository.remove(guest)
  }
}
