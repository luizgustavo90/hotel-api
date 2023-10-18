import { Room } from '../entities/Room'
import { IRoomRepository } from '@room/repositories/IRoomRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteRoomUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
  ) {}

  async execute(rommNo: number): Promise<Room> {
    const room = await this.roomRepository.findByNumber(rommNo)
    await this.roomRepository.delete(room)

    return room
  }
}
