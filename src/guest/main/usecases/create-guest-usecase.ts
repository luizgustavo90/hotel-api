import { Guest } from '../entities/Guest'
import { AppError } from '@shared/errors/AppError'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'
import { inject, injectable } from 'tsyringe'
import { CreateGuestDTO } from '../entities/types'

@injectable()
export class CreateGuestUseCase {
  constructor(
    @inject('GuestRepository') private guestRepository: IGuestRepository,
  ) {}

  async execute({
    name,
    document,
    email,
    phone,
    age,
  }: CreateGuestDTO): Promise<Guest> {
    const emailExists = await this.guestRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already exists!')
    }

    const user = await this.guestRepository.create({
      name,
      document,
      email,
      phone,
      age,
    })

    return user
  }
}
