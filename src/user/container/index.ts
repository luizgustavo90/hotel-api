import { container } from 'tsyringe'
import { IUserRepository } from '@user/repositories/IUserRepository'
import { UserRepository } from '@user/repositories/UserRepository'
import { CreateUserController } from '@user/controllers/create-user-controller'
import { UpdateUserController } from '@user/controllers/update-user-controller'
import { ListUserController } from '@user/controllers/list-user-controller'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('UpdateUserController', UpdateUserController)
container.registerSingleton('ListUserController', ListUserController)
