import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { CheckOutDTO, FinishCheckOutDTO } from '../entities/types'
import { IReserveRepository } from '@reserve/repositories/IReserveRepository'
import { IRoomRepository } from '@room/repositories/IRoomRepository'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'
import { parseCheckout } from '@reserve/util/parse-checkout'

@injectable()
export class CheckOutReserveUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
    @inject('ReserveRepository') private reserveRepository: IReserveRepository,
    @inject('GuestRepository') private guestRepository: IGuestRepository,
  ) {}

  async execute({ guestId, rommNo }: FinishCheckOutDTO): Promise<CheckOutDTO> {
    // eslint-disable-next-line prefer-const
    let guest = await this.guestRepository.findById(guestId)
    if (!guest) {
      throw new AppError('This guest doesn`t exists!', 404)
    }
    const room = await this.roomRepository.findByNumber(rommNo)
    if (!room) {
      throw new AppError('This room doesn`t exists!', 404)
    }
    const reserve = await this.reserveRepository.findByNumber(rommNo)
    const checkOut = parseCheckout(reserve, guest)

    guest.roomNo = null
    room.status = 'Livre'
    await this.roomRepository.save(room)
    await this.guestRepository.save(guest)
    await this.reserveRepository.delete(reserve)

    return checkOut
  }
}
