import { dataSource } from '@shared/typeorm'
import { Room } from '../main/entities/Room'
import { Repository } from 'typeorm'
import {
  RoomPaginateProperties,
  PaginateParams,
  CreateRoomDTO,
  ExtendedPaginateParams,
} from '../main/entities/types'
import { IRoomRepository } from './IRoomRepository'
//import { roomsRoute } from '@room/http/routes/room.routes'

export class RoomRepository implements IRoomRepository {
  private repository: Repository<Room>

  constructor() {
    this.repository = dataSource.getRepository(Room)
  }
  async create({
    type,
    value,
    status,
    createdAt,
  }: CreateRoomDTO): Promise<Room> {
    const room = this.repository.create({ type, value, status, createdAt })
    return this.repository.save(room)
  }

  async save(room: Room): Promise<Room> {
    return this.repository.save(room)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<RoomPaginateProperties> {
    const [user, count] = await this.repository
      .createQueryBuilder('r')
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

  async findByParams({
    page,
    skip,
    take,
    type = undefined,
    status = undefined,
    rommNo = undefined,
  }: ExtendedPaginateParams): Promise<RoomPaginateProperties> {
    const query = this.repository.createQueryBuilder('r').skip(skip).take(take)

    if (type !== 'undefined') {
      query.where('r.type = :type', { type })
    } else if (status !== 'undefined') {
      query.andWhere('r.status = :status', { status })
    } else if (rommNo || !isNaN(Number(rommNo))) {
      query.andWhere('r.rommNo = :rommNo', { rommNo })
    }

    const [user, count] = await query.getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: user,
    }

    return result
  }

  async findByNumber(rommNo: number): Promise<Room | null> {
    return this.repository.findOneBy({ rommNo })
  }

  async findByType(type: string): Promise<Room | null> {
    return this.repository.findOneBy({ type })
  }

  async findByStatus(status: string): Promise<Room | null> {
    return this.repository.findOneBy({ status })
  }

  async delete(room: Room): Promise<void> {
    await this.repository.remove(room)
  }
}
