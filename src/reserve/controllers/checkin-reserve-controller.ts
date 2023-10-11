import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CheckInGuestUseCase } from '@guest/main/usecases/checkin-guest-usecases'

export class CheckInGuestController {
  async handle(req: Request, res: Response): Promise<Response> {
    const checkInGuestUseCase = container.resolve(CheckInGuestUseCase)
    const { type, guestId } = req.params
    const rommNo = Number(req.params.roomNo)

    const reserve = await checkInGuestUseCase.execute({
      type,
      rommNo,
      guestId,
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
