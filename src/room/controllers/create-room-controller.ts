import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CreateRoomUseCase } from '../main/usecases/create-room-usecases'

export class CreateRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createRoomUseCase = container.resolve(CreateRoomUseCase)
    const type = req.params.type
    const room = await createRoomUseCase.execute(type)
    return res
      .status(201)
      .json({ message: { statusCode: 201, detail: 'Room created!' }, room })
  }
}
