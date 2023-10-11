import { ListRoomUseCase } from '@room/main/usecases/list-room-usecases'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListRoomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRoomUseCase = container.resolve(ListRoomUseCase)
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1
    const limit = Number(process.env.PAGE_SIZE)

    const room = await listRoomUseCase.execute({ page, limit })
    return response.json(room)
  }
}
