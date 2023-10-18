import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { DeleteGuestUseCase } from '@guest/main/usecases/delete-guest-usecase'
import { guestIdVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'

export class DeleteGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
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
