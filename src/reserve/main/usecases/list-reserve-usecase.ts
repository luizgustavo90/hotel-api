import { IReserveRepository } from '@reserve/repositories/IReserveRepository'
import { ReservePaginateProperties } from '../entities/types'
import { inject, injectable } from 'tsyringe'

type ListReserveUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListReserveUseCase {
  constructor(
    @inject('ReserveRepository') private reserveRepository: IReserveRepository,
  ) {}

  async execute({
    page,
    limit,
  }: ListReserveUseCaseParams): Promise<ReservePaginateProperties> {
    console.log('esta entrando no usecase')
    const take = limit
    const skip = (Number(page) - 1) * take
    const reserves = this.reserveRepository.findAll({ page, skip, take })
    return reserves
  }
}
