import { Guest } from '../entities/Guest'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'
import { inject, injectable } from 'tsyringe'
import { UpdateGuestDTO } from '../entities/types'

@injectable()
export class UpdateGuestUseCase {
  constructor(
    @inject('GuestRepository') private guestRepository: IGuestRepository,
  ) {}

  async execute({
    id,
    name,
    document,
    email,
    phone,
    age,
  }: UpdateGuestDTO): Promise<Guest> {
    const guest = await this.guestRepository.findById(id)

    if (name) {
      guest.name = name
    }
    if (document) {
      guest.document = document
    }
    if (email) {
      guest.email = email
    }
    if (phone) {
      guest.phone = phone
    }
    if (age) {
      guest.age = age
    }

    await this.guestRepository.save(guest)

    return guest
  }
}
