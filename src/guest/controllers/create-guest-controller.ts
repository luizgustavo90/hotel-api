import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { CreateGuestUseCase } from '@guest/main/usecases/create-guest-usecase'

export class CreateGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createGuestUseCase = container.resolve(CreateGuestUseCase)
    const { name, document, email, phone, age } = req.body
    const guest = await createGuestUseCase.execute({
      name,
      document,
      email,
      phone,
      age,
    })
    return res.status(201).json(instanceToInstance(guest))
  }
}