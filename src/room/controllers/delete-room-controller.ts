import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { DeleteRoomUseCase } from '@room/main/usecases/delete-room-usecase'
import { roomVerify } from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'
import { tokenVerify } from '@user/util/jwt-token'

export class DeleteRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tokenVerified = await tokenVerify(req.headers.authorization)
      if (!tokenVerified) {
        throw ErrorMessage(res, 'Token Error', 401, 'Token is wrong or empty')
      }
      const deleteRoomUseCase = container.resolve(DeleteRoomUseCase)
      const rommNo = Number(req.query.roomNo)
      await roomVerify(res, rommNo)
      await deleteRoomUseCase.execute(rommNo)
      return res.status(201).json({
        message: {
          statusCode: 201,
          detail: `Room ${rommNo} was deleted successfully`,
        },
      })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
