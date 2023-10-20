import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { DeleteGuestUseCase } from '@guest/main/usecases/delete-guest-usecase'
import { guestIdVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'
import { tokenVerify } from '@user/util/jwt-token'

export class DeleteGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tokenVerified = await tokenVerify(req.headers.authorization)
      if (!tokenVerified) {
        throw ErrorMessage(res, 'Token Error', 401, 'Token is wrong or empty')
      }
      const deleteGuestUseCase = container.resolve(DeleteGuestUseCase)
      const id = req.params.id
      await guestIdVerify(res, id)
      await deleteGuestUseCase.execute(id)
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
