import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { emailVerify } from '@shared/util/middlewares/verification'
import { CreateUserUseCase } from '@user/main/entities/usecases/create-user-usecases'
import { ErrorMessage } from '@shared/errors/error-standard'
import { createPasswordJwt } from '@user/util/jwt-token'
import 'dotenv/config'

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase)
      const { name, department, email } = req.body
      const passwordUser = req.body.password
      await emailVerify(res, email)
      const password = createPasswordJwt(
        email,
        passwordUser,
        process.env.SECRET,
      )
      const user = await createUserUseCase.execute({
        name,
        department,
        email,
        password,
      })
      return res
        .status(201)
        .json({ message: { statusCode: 201, detail: 'User created!' }, user })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
