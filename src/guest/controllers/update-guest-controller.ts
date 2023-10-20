import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UpdateGuestUseCase } from '@guest/main/usecases/update-guest-usecase'
import { guestIdVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'
import { tokenVerify } from '@user/util/jwt-token'

export class UpdateGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tokenVerified = await tokenVerify(req.headers.authorization)
      if (!tokenVerified) {
        throw ErrorMessage(res, 'Token Error', 401, 'Token is wrong or empty')
      }
      const updateGuestUseCase = container.resolve(UpdateGuestUseCase)
      const { id } = req.params
      await guestIdVerify(res, id)
      const { name, document, email, phone, age } = req.body
      const guest = await updateGuestUseCase.execute({
        id,
        name,
        document,
        email,
        phone,
        age,
      })
      return res.status(201).json(instanceToInstance(guest))
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
