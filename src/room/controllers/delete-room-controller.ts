import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { DeleteRoomUseCase } from '@room/main/usecases/delete-room-usecase'

export class DeleteRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    const deleteRoomUseCase = container.resolve(DeleteRoomUseCase)
    const rommNo = Number(req.query.roomNo)
    await deleteRoomUseCase.execute(rommNo)
    return res.status(201).json({
      message: {
        statusCode: 201,
        detail: `Room ${rommNo} was deleted successfully`,
      },
    })
  }
}
