import { PaginateParamsFilter, RoomPaginateProperties } from '../entities/types'
import { inject, injectable } from 'tsyringe'
import { IRoomRepository } from '@room/repositories/IRoomRepository'

@injectable()
export class ListRoomByParamUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
  ) {}

  async execute({
    page,
    limit,
    rommNo,
    status,
    type,
  }: PaginateParamsFilter): Promise<RoomPaginateProperties> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const rooms = this.roomRepository.findByParams({
      page,
      skip,
      take,
      type,
      status,
      rommNo,
      limit,
    })
    return rooms
  }
}
