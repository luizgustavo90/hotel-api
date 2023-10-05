import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { DeleteGuestUseCase } from '@guest/main/usecases/delete-guest-usecase'

export class DeleteGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    const deleteGuestUseCase = container.resolve(DeleteGuestUseCase)
    const id = req.params.id
    await deleteGuestUseCase.execute(id)
    return res.status(201).json({
      message: {
        statusCode: 201,
        detail: 'Guest was deleted successfully',
      },
    })
  }
}
