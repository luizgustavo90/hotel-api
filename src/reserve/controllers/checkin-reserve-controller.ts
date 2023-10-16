import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CheckInReserveUseCase } from '@reserve/main/usecases/checkin-reserve-usecases'

export class CheckInReserveController {
  async handle(req: Request, res: Response): Promise<Response> {
    const checkInGuestUseCase = container.resolve(CheckInReserveUseCase)
    const { type, guestId } = req.params
    const stay = Number(req.query.stay)
    const rommNo = Number(req.params.roomNo)

    const reserve = await checkInGuestUseCase.execute({
      type,
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
  }
}
