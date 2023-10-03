import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { ListGuestUseCase } from '@guest/main/usecases/list-guest-usecase'

export class ListGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listGuestUseCase = container.resolve(ListGuestUseCase)
    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1
    const limit =
      req.query.limit && Number(req.query.limit) > 0
        ? Number(req.query.limit)
        : 15
    const guest = await listGuestUseCase.execute({ page, limit })
    return res.status(201).json(instanceToInstance(guest))
  }
}
