import { User } from '../User'
import { IUserRepository } from '@user/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import { UpdateUserDTO } from '../types'

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({
    id,
    name,
    department,
    email,
    password,
  }: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id)

    if (name) {
      user.name = name
    }
    if (department) {
      user.department = department
    }
    if (email) {
      user.email = email
    }
    if (password) {
      user.password = password
    }

    await this.userRepository.save(user)

    return user
  }
}
