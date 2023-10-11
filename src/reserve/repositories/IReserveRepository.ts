import { Reserve } from '@reserve/main/entities/Reserve'
import {
  PaginateParams,
  CreateCheckInDTO,
  ReservePaginateProperties,
} from '../main/entities/types'

export interface IReserveRepository {
  create({ type, rommNo, guestId }: CreateCheckInDTO): Promise<Reserve>
  save(reserve: Reserve): Promise<Reserve>
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<ReservePaginateProperties>
  findById(id: string): Promise<Reserve | null>
  delete(reserve: Reserve): Promise<void>
}
