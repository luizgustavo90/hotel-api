import { User } from '../User'
import { IUserRepository } from '@user/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('GuestRepository') private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    await this.userRepository.delete(user)

    return user
  }
}
