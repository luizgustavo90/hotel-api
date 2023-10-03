import { container } from 'tsyringe'
import { CreateGuestController } from '@guest/controllers/create-guest-controller'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'
import { GuestRepository } from '@guest/repositories/GuestRepository'
import { ListGuestController } from '@guest/controllers/list-guest-controller'

container.registerSingleton<IGuestRepository>(
  'GuestRepository',
  GuestRepository,
)

container.registerSingleton('CreateGuestController', CreateGuestController)
container.registerSingleton('ListGuestController', ListGuestController)
