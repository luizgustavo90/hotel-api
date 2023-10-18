import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CreateGuestUseCase } from '@guest/main/usecases/create-guest-usecase'
import { emailVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'

export class CreateGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const createGuestUseCase = container.resolve(CreateGuestUseCase)
      const { name, document, email, phone, age } = req.body
      await emailVerify(res, email)
      const guest = await createGuestUseCase.execute({
        name,
        document,
        email,
        phone,
        age,
      })
      return res
        .status(201)
        .json({ message: { statusCode: 201, detail: 'Guest created!' }, guest })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
