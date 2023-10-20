import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'
import {
  ReservePaginateProperties,
  CreateCheckInDTO,
  PaginateParams,
} from '../main/entities/types'
import { IReserveRepository } from './IReserveRepository'
import { Reserve } from '../main/entities/Reserve'

export class ReserveRepository implements IReserveRepository {
  private repository: Repository<Reserve>

  constructor() {
    this.repository = dataSource.getRepository(Reserve)
  }

  async create({
    rommNo,
    guestId,
    checkIn,
    checkOut,
    totalCost,
  }: CreateCheckInDTO): Promise<Reserve> {
    const reserve = this.repository.create({
      rommNo,
      guestId,
      checkIn,
      checkOut,
      totalCost,
    })
    return this.repository.save(reserve)
  }

  async save(reserve: Reserve): Promise<Reserve> {
    return this.repository.save(reserve)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<ReservePaginateProperties> {
    const [user, count] = await this.repository
      .createQueryBuilder('resv')
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

  async findById(id: string): Promise<Reserve | null> {
    return this.repository.findOneBy({ id })
  }
  async findByGuestId(guestId: string): Promise<Reserve | null> {
    return this.repository.findOneBy({ guestId })
  }
  async delete(reserve: Reserve): Promise<void> {
    await this.repository.remove(reserve)
  }
  async findByNumber(rommNo: number): Promise<Reserve | null> {
    return this.repository.findOneBy({ rommNo })
  }
}
