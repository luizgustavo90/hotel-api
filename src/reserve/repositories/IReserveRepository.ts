import { Reserve } from '@reserve/main/entities/Reserve'
import {
  PaginateParams,
  CreateCheckInDTO,
  ReservePaginateProperties,
} from '../main/entities/types'

export interface IReserveRepository {
  create({
    rommNo,
    guestId,
    checkIn,
    checkOut,
    totalCost,
  }: CreateCheckInDTO): Promise<Reserve>
  save(reserve: Reserve): Promise<Reserve>
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<ReservePaginateProperties>
  findById(id: string): Promise<Reserve | null>
  findByNumber(roomId: number): Promise<Reserve | null>
  delete(reserve: Reserve): Promise<void>
}
