import { ListRoomUseCase } from '@room/main/usecases/list-room-usecases'
import { ErrorMessage } from '@shared/errors/error-standard'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const listRoomUseCase = container.resolve(ListRoomUseCase)
      const page =
        req.query.page && Number(req.query.page) > 0
          ? Number(req.query.page)
          : 1
      const limit = Number(process.env.PAGE_SIZE)

      const room = await listRoomUseCase.execute({ page, limit })
      return res.json(room)
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
