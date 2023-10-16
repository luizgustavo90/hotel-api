import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CheckOutReserveUseCase } from '@reserve/main/usecases/checkout-reserve-usecases'

export class CheckOutReserveController {
  async handle(req: Request, res: Response): Promise<Response> {
    const checkOutGuestUseCase = container.resolve(CheckOutReserveUseCase)
    const guestId = req.params.guestId
    const rommNo = Number(req.params.roomNo)

    const reserve = await checkOutGuestUseCase.execute({
      guestId,
      rommNo,
    })

    return res.status(201).json({
      message: {
        statusCode: 201,
        message: 'CheckOut Done!',
      },
      reserve,
    })
  }
}
