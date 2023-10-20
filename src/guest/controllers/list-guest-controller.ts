import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { ListGuestUseCase } from '@guest/main/usecases/list-guest-usecase'
import { ErrorMessage } from '@shared/errors/error-standard'
import { tokenVerify } from '@user/util/jwt-token'

export class ListGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tokenVerified = await tokenVerify(req.headers.authorization)
      if (!tokenVerified) {
        throw ErrorMessage(res, 'Token Error', 401, 'Token is wrong or empty')
      }
      const listGuestUseCase = container.resolve(ListGuestUseCase)
      const page =
        req.query.page && Number(req.query.page) > 0
          ? Number(req.query.page)
          : 1
      const limit = Number(process.env.PAGE_SIZE)
      const guest = await listGuestUseCase.execute({ page, limit })
      return res.status(201).json(instanceToInstance(guest))
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
