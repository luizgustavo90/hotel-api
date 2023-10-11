import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { CreateCheckInDTO } from '../entities/types'
import { IRoomRepository } from '@room/repositories/IRoomRepository'
import { Reserve } from '../entities/Reserve'
import moment from 'moment'

@injectable()
export class CheckInGuestUseCase {
  constructor(
    @inject('')
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
  ) {}

  async execute({ type, rommNo, guestId }: CreateCheckInDTO): Promise<Reserve> {
    const checkIn = String(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    )
    const roomExists = await this.roomRepository.findByNumber(rommNo)
    if (roomExists.status !== 'Livre' && roomExists.type === type) {
      throw new AppError('This room is already occupied!', 404)
    }

    const reserve = await this.guestRepository.create({
      checkIn,
      rommNo,
      guestId,
    })

    return reserve
  }
}
