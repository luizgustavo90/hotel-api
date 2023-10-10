import { ListRoomByParamUseCase } from '@room/main/usecases/list-room-by-param-usecases'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListRoomByParamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRoomByParamUseCase = container.resolve(ListRoomByParamUseCase)
    const { roomNo, status, type } = req.query
    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1
    const limit =
      req.query.limit && Number(req.query.limit) > 0
        ? Number(req.query.limit)
        : 15

    const room = await listRoomByParamUseCase.execute({
      page,
      limit,
      roomNo,
      status,
      type,
    })
    return res.json(room)
  }
}
