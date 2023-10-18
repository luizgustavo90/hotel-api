import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CheckOutReserveUseCase } from '@reserve/main/usecases/checkout-reserve-usecases'
import { ErrorMessage } from '@shared/errors/error-standard'
import {
  guestIdVerify,
  roomVerify,
} from '@shared/util/middlewares/verification'

export class CheckOutReserveController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const checkOutGuestUseCase = container.resolve(CheckOutReserveUseCase)
      const guestId = req.params.guestId
      const rommNo = Number(req.params.roomNo)
      await guestIdVerify(res, guestId)
      await roomVerify(res, rommNo)

      const checkOutInfo = await checkOutGuestUseCase.execute({
        guestId,
        rommNo,
      })

      return res.status(201).json({
        message: {
          statusCode: 201,
          message: 'CheckOut Done!',
        },
        checkOutInfo,
      })
    } catch (err) {
      return ErrorMessage(res, 'Server Error', 500, err.message)
    }
  }
}
