import { container } from 'tsyringe'
import { IGuestRepository } from '@guest/repositories/IGuestRepository'
import { GuestRepository } from '@guest/repositories/GuestRepository'
import { CreateGuestController } from '@guest/controllers/create-guest-controller'
import { ListGuestController } from '@guest/controllers/list-guest-controller'
import { DeleteGuestController } from '@guest/controllers/delete-guest-controller'
import { UpdateGuestController } from '@guest/controllers/update-guest-controller'

container.registerSingleton<IGuestRepository>(
  'GuestRepository',
  GuestRepository,
)

container.registerSingleton('CreateGuestController', CreateGuestController)
container.registerSingleton('ListGuestController', ListGuestController)
container.registerSingleton('DeleteGuestController', DeleteGuestController)
container.registerSingleton('UpdateGuestController', UpdateGuestController)
