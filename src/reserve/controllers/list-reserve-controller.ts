import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { ListReserveUseCase } from '@reserve/main/usecases/list-reserve-usecase'
import { ErrorMessage } from '@shared/errors/error-standard'
import { tokenVerify } from '@user/util/jwt-token'

export class ListReserveController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tokenVerified = await tokenVerify(req.headers.authorization)
      if (!tokenVerified) {
        throw ErrorMessage(res, 'Token Error', 401, 'Token is wrong or empty')
      }
      const listReserveUseCase = container.resolve(ListReserveUseCase)
      const page =
        req.query.page && Number(req.query.page) > 0
          ? Number(req.query.page)
          : 1
      const limit = Number(process.env.PAGE_SIZE)
      const reserves = await listReserveUseCase.execute({ page, limit })
      return res.status(201).json(instanceToInstance(reserves))
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
