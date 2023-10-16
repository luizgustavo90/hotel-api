import { container } from 'tsyringe'
import { IReserveRepository } from '@reserve/repositories/IReserveRepository'
import { ReserveRepository } from '@reserve/repositories/ReserveRepository'
import { CheckInReserveController } from '@reserve/controllers/checkin-reserve-controller'
import { ListReserveController } from '@reserve/controllers/list-reserve-controller'

container.registerSingleton<IReserveRepository>(
  'ReserveRepository',
  ReserveRepository,
)

container.registerSingleton(
  'CheckInReserveController',
  CheckInReserveController,
)
container.registerSingleton('ListReserveController', ListReserveController)
