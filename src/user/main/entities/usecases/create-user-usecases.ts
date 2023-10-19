import { User } from '../User'
import { IUserRepository } from '@user/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import { CreateUserDTO } from '../types'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}
  async execute({
    name,
    department,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create({
      name,
      department,
      email,
      password,
    })
    console.log('ta entrando aqui--', user)
    return user
  }
}
