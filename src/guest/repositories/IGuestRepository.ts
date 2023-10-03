import { Guest } from '../main/entities/Guest'
import {
  CreateGuestDTO,
  PaginateParams,
  GuestPaginateProperties,
} from '../main/entities/types'

export interface IGuestRepository {
  create({ name, document, email, phone, age }: CreateGuestDTO): Promise<Guest>
  save(guest: Guest): Promise<Guest>
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<GuestPaginateProperties>
  findByEmail(email: string): Promise<Guest | null>
}
