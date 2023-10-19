import { Guest } from '../entities/Guest'
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
    const guest = await this.guestRepository.create({
      name,
      document,
      email,
      phone,
      age,
    })

    return guest
  }
}
