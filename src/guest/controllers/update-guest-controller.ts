import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UpdateGuestUseCase } from '@guest/main/usecases/update-guest-usecase'

export class UpdateGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateGuestUseCase = container.resolve(UpdateGuestUseCase)
    const { id } = req.params
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
  }
}
