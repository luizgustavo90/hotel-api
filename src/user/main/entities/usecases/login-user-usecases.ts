import { IUserRepository } from '@user/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import { LoginUserReturn } from '../types'
import { createJwtToken } from '@user/util/jwt-token'
import { parseLoginUser } from '@user/util/parse-login-return'

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}
  async execute({ email, password }): Promise<LoginUserReturn> {
    const token = createJwtToken(email, password)
    const user = await this.userRepository.findByEmail(email)
    user.token = token
    await this.userRepository.save(user)
    const userReturn = parseLoginUser(user)

    return userReturn
  }
}
