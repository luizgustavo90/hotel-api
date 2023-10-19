import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { DeleteUserUseCase } from '@user/main/entities/usecases/delete-user-usecase'
import { guestIdVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const deleteUserUseCase = container.resolve(DeleteUserUseCase)
      const id = req.params.id
      await guestIdVerify(res, id)
      await deleteUserUseCase.execute(id)
      return res.status(201).json({
        message: {
          statusCode: 201,
          detail: 'Guest was deleted successfully',
        },
      })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
