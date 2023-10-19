import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UpdateUserUseCase } from '@user/main/entities/usecases/update-user-usecase'
import { guestIdVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const updateUserUseCase = container.resolve(UpdateUserUseCase)
      const { id } = req.params
      await guestIdVerify(res, id)
      const { name, department, email, password } = req.body
      const user = await updateUserUseCase.execute({
        id,
        name,
        department,
        email,
        password,
      })
      return res.status(201).json(instanceToInstance(user))
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
