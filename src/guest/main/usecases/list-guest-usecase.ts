import { IGuestRepository } from '@guest/repositories/IGuestRepository'
import { GuestPaginateProperties } from '../entities/types'
import { inject, injectable } from 'tsyringe'

type ListGuestUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListGuestUseCase {
  constructor(
    @inject('GuestRepository') private guestRepository: IGuestRepository,
  ) {}

  async execute({
    page,
    limit,
  }: ListGuestUseCaseParams): Promise<GuestPaginateProperties> {
    console.log('esta entrando no usecase')
    const take = limit
    const skip = (Number(page) - 1) * take
    const users = this.guestRepository.findAll({ page, skip, take })
    return users
  }
}
