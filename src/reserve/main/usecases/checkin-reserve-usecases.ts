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

  async execute({ rommNo, guestId, stay }: CreateCheckInDTO): Promise<Reserve> {
    // eslint-disable-next-line prefer-const
    const guest = await this.guestRepository.findById(guestId)
    const room = await this.roomRepository.findByNumber(rommNo)
    const checkInString = String(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    )
    guest.roomNo = rommNo
    room.status = 'Ocupado'
    await this.roomRepository.save(room)
    await this.guestRepository.save(guest)

    const checkInMoment = moment(checkInString, 'YYYY-MM-DD HH:mm:ss')
    const checkOutMoment = checkInMoment.clone().add(stay, 'days')
    const checkIn = checkInMoment.format('YYYY-MM-DD HH:mm:ss')
    const checkOut = checkOutMoment.format('YYYY-MM-DD HH:mm:ss')
    const totalCost = Number(stay * room.value)

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
