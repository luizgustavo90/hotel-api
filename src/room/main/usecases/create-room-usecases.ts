import { Room } from '../entities/Room'
import { IRoomRepository } from '@room/repositories/IRoomRepository'
import moment from 'moment-timezone'
import { inject, injectable } from 'tsyringe'
import 'dotenv/config'

@injectable()
export class CreateRoomUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
  ) {}

  async execute(type: string): Promise<Room> {
    let value = 0
    // eslint-disable-next-line prefer-const
    let status = 'Livre'

    if (type === 'Casal') {
      value = Number(process.env.VALUE_CASAL)
    } else if (type === 'Solteiro') {
      value = Number(process.env.VALUE_SOLTEIRO)
    } else if (type === 'Familia') {
      value = Number(process.env.VALUE_FAMILIA)
    }
    const createdAt = moment()
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss')
    console.log('valores-->', type, value, status, createdAt)
    const room = await this.roomRepository.create({
      type,
      value,
      status,
      createdAt,
    })

    return room
  }
}
