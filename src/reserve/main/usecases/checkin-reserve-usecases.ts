import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { CreateCheckInDTO } from '../entities/types'
import { IReserveRepository } from '@reserve/repositories/IReserveRepository'
import { IRoomRepository } from '@room/repositories/IRoomRepository'
import { Reserve } from '../entities/Reserve'
import moment from 'moment'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'

@injectable()
export class CheckInReserveUseCase {
  constructor(
    @inject('RoomRepository') private roomRepository: IRoomRepository,
    @inject('ReserveRepository') private reserveRepository: IReserveRepository,
    @inject('GuestRepository') private guestRepository: IGuestRepository,
  ) {}

  async execute({
    type,
    rommNo,
    guestId,
    stay,
  }: CreateCheckInDTO): Promise<Reserve> {
    // eslint-disable-next-line prefer-const
    let guestIdExists = await this.guestRepository.findById(guestId)
    if (!guestIdExists) {
      throw new AppError('This guest doesn`t exists!', 404)
    }
    const roomExists = await this.roomRepository.findByNumber(rommNo)
    if (!roomExists) {
      throw new AppError('This room doesn`t exists!', 404)
    }
    if (roomExists.type !== type) {
      throw new AppError('This room is not according you need (type)', 404)
    }
    const roomFree = await this.roomRepository.findByNumber(rommNo)
    if (roomFree.status !== 'Livre' && roomFree.type === type) {
      throw new AppError('This room is already occupied!', 404)
    }
    const checkInString = String(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    )

    guestIdExists.roomNo = rommNo
    roomExists.status = 'Ocupado'
    await this.roomRepository.save(roomExists)
    await this.guestRepository.save(guestIdExists)

    const checkInMoment = moment(checkInString, 'YYYY-MM-DD HH:mm:ss')
    const checkOutMoment = checkInMoment.clone().add(stay, 'days')
    const checkIn = checkInMoment.format('YYYY-MM-DD HH:mm:ss')
    const checkOut = checkOutMoment.format('YYYY-MM-DD HH:mm:ss')
    const totalCost = Number(stay * roomExists.value)

    const reserve = await this.reserveRepository.create({
      checkIn,
      checkOut,
      rommNo,
      guestId,
      totalCost,
    })

    return reserve
  }
}
