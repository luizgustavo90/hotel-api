import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { emailVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'
import { LoginUserUseCase } from '@user/main/entities/usecases/login-user-usecases'

export class LoginUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const loginUserUseCase = container.resolve(LoginUserUseCase)
      const { email, password } = req.body
      await emailVerify(res, email)
      const userLogged = await loginUserUseCase.execute({
        email,
        password,
      })
      return res.status(201).json({
        message: { statusCode: 201, detail: 'User logged!' },
        userLogged,
      })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
