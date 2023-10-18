import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CheckInReserveUseCase } from '@reserve/main/usecases/checkin-reserve-usecases'
import {
  guestIdVerify,
  roomAccordVerify,
  roomEmptyVerify,
  roomVerify,
} from '@shared/util/middlewares/verification'
import { ErrorMessage } from '@shared/errors/error-standard'

export class CheckInReserveController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const checkInGuestUseCase = container.resolve(CheckInReserveUseCase)
      const { type, guestId } = req.params
      const stay = Number(req.query.stay)
      const rommNo = Number(req.params.roomNo)
      await guestIdVerify(res, guestId)
      await roomVerify(res, rommNo)
      await roomEmptyVerify(res, rommNo)
      await roomAccordVerify(res, rommNo, type)

      const reserve = await checkInGuestUseCase.execute({
        rommNo,
        guestId,
        stay,
      })
      return res.status(201).json({
        message: {
          statusCode: 201,
          message: 'CheckIn Done!',
        },
        reserve,
      })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
