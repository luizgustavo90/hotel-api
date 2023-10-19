import { IUserRepository } from '@user/repositories/IUserRepository'
import { UsersPaginateProperties } from '../types'
import { inject, injectable } from 'tsyringe'

type ListUserUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({
    page,
    limit,
  }: ListUserUseCaseParams): Promise<UsersPaginateProperties> {
    console.log('esta entrando no usecase')
    const take = limit
    const skip = (Number(page) - 1) * take
    const users = this.userRepository.findAll({ page, skip, take })
    return users
  }
}
