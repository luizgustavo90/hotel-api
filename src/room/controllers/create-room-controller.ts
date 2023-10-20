import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CreateRoomUseCase } from '../main/usecases/create-room-usecases'
import { ErrorMessage } from '@shared/errors/error-standard'
import { tokenVerify } from '@user/util/jwt-token'

export class CreateRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tokenVerified = await tokenVerify(req.headers.authorization)
      if (!tokenVerified) {
        throw ErrorMessage(res, 'Token Error', 401, 'Token is wrong or empty')
      }
      const createRoomUseCase = container.resolve(CreateRoomUseCase)
      const type = req.params.type
      const room = await createRoomUseCase.execute(type)
      return res
        .status(201)
        .json({ message: { statusCode: 201, detail: 'Room created!' }, room })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
