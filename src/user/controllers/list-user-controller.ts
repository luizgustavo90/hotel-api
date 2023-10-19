import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { ErrorMessage } from '@shared/errors/error-standard'
import { ListUserUseCase } from '@user/main/entities/usecases/list-user-usecase'

export class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const listUserUseCase = container.resolve(ListUserUseCase)
      const page =
        req.query.page && Number(req.query.page) > 0
          ? Number(req.query.page)
          : 1
      const limit = Number(process.env.PAGE_SIZE)
      const user = await listUserUseCase.execute({ page, limit })
      return res.status(201).json(instanceToInstance(user))
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
