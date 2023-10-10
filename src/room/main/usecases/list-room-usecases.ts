import { RoomPaginateProperties } from '../entities/types'
import { inject, injectable } from 'tsyringe'
import { IRoomRepository } from '@room/repositories/IRoomRepository'

type ListRoomUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListRoomUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
  ) {}

  async execute({
    limit,
    page,
  }: ListRoomUseCaseParams): Promise<RoomPaginateProperties> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const rooms = this.roomRepository.findAll({ page, skip, take })
    return rooms
  }
}
