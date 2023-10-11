import { Room } from '../entities/Room'
import { AppError } from '@shared/errors/AppError'
import { IRoomRepository } from '@room/repositories/IRoomRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteRoomUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
  ) {}

  async execute(rommNo: number): Promise<Room> {
    const room = await this.roomRepository.findByNumber(rommNo)
    if (!room) {
      throw new AppError('This ID is not in database!')
    }
    await this.roomRepository.delete(room)

    return room
  }
}
