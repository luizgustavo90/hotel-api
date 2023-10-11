import { container } from 'tsyringe'
import { CheckInGuestController } from '@reserve/controllers/checkin-reserve-controller'
import { IReserveRepository } from '@reserve/repositories/IReserveRepository'
import { ReserveRepository } from '@reserve/repositories/ReserveRepository'
container.registerSingleton<IReserveRepository>(
  'ReserveRepository',
  ReserveRepository,
)

container.registerSingleton('CheckInGuestController', CheckInGuestController)
