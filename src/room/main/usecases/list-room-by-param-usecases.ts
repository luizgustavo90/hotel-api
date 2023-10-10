import {
  ExtendedPaginateParams,
  RoomPaginateProperties,
} from '../entities/types'
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
    type,
    status,
    roomNo,
  }: ExtendedPaginateParams): Promise<RoomPaginateProperties> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const rooms = this.roomRepository.findByParams({
      page,
      skip,
      take,
      type,
      status,
      roomNo,
      limit,
    })
    return rooms
  }
}
