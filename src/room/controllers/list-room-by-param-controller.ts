import { ListRoomByParamUseCase } from '@room/main/usecases/list-room-by-param-usecases'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import 'dotenv/config'
import { ErrorMessage } from '@shared/errors/error-standard'
import { tokenVerify } from '@user/util/jwt-token'

export class ListRoomByParamController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tokenVerified = await tokenVerify(req.headers.authorization)
      if (!tokenVerified) {
        throw ErrorMessage(res, 'Token Error', 401, 'Token is wrong or empty')
      }
      const listRoomByParamUseCase = container.resolve(ListRoomByParamUseCase)
      const status = String(req.query.status)
      const type = String(req.query.type)
      const rommNo = Number(req.query.roomNo) || undefined
      const limit = Number(process.env.PAGE_SIZE)
      const page =
        req.query.page && Number(req.query.page) > 0
          ? Number(req.query.page)
          : 1

      const room = await listRoomByParamUseCase.execute({
        page,
        limit,
        rommNo,
        status,
        type,
      })
      return res.json(room)
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
