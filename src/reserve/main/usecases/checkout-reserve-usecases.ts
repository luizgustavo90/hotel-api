import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { CheckOutMessage, FinishCheckOutDTO } from '../entities/types'
import { IReserveRepository } from '@reserve/repositories/IReserveRepository'
import { IRoomRepository } from '@room/repositories/IRoomRepository'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'

@injectable()
export class CheckOutReserveUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
    @inject('ReserveRepository') private reserveRepository: IReserveRepository,
    @inject('GuestRepository') private guestRepository: IGuestRepository,
  ) {}

  async execute({
    guestId,
    rommNo,
  }: FinishCheckOutDTO): Promise<CheckOutMessage> {
    // eslint-disable-next-line prefer-const
    let guestIdExists = await this.guestRepository.findById(guestId)
    if (!guestIdExists) {
      throw new AppError('This guest doesn`t exists!', 404)
    }
    const roomExists = await this.roomRepository.findByNumber(rommNo)
    if (!roomExists) {
      throw new AppError('This room doesn`t exists!', 404)
    }
    const roomReserved = await this.reserveRepository.findByNumber(rommNo)
    const checkOut = {
      checkIn: roomReserved,
      value: `Total cost R$: ${roomReserved.totalCost}`,
    }

    guestIdExists.roomNo = null
    roomExists.status = 'Livre'
    await this.roomRepository.save(roomExists)
    await this.guestRepository.save(guestIdExists)
    await this.reserveRepository.delete(roomReserved)

    return checkOut
  }
}
