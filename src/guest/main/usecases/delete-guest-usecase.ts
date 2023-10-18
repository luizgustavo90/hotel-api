import { Guest } from '../entities/Guest'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteGuestUseCase {
  constructor(
    @inject('GuestRepository') private guestRepository: IGuestRepository,
  ) {}

  async execute(id: string): Promise<Guest> {
    const guest = await this.guestRepository.findById(id)
    await this.guestRepository.delete(guest)

    return guest
  }
}
