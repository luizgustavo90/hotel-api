import { ListRoomByParamUseCase } from '@room/main/usecases/list-room-by-param-usecases'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import 'dotenv/config'

export class ListRoomByParamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRoomByParamUseCase = container.resolve(ListRoomByParamUseCase)
    const status = String(req.query.status)
    const type = String(req.query.type)
    const rommNo = Number(req.query.roomNo) || undefined
    const limit = Number(process.env.PAGE_SIZE)
    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1

    const room = await listRoomByParamUseCase.execute({
      page,
      limit,
      rommNo,
      status,
      type,
    })
    return res.json(room)
  }
}
