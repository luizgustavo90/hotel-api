import { CreateUserController } from '@user/controllers/create-user-controller'
import { DeleteUserController } from '@user/controllers/delete-user-controller'
import { ListUserController } from '@user/controllers/list-user-controller'
import { LoginUserController } from '@user/controllers/login-user-controller'
import { UpdateUserController } from '@user/controllers/update-user-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const userRoute = Router()
const createUserController = container.resolve(CreateUserController)
const updateUserController = container.resolve(UpdateUserController)
const listUserController = container.resolve(ListUserController)
const deleteUserController = container.resolve(DeleteUserController)
const loginUserController = container.resolve(LoginUserController)

userRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      department: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return createUserController.handle(req, res)
  },
)

userRoute.put(
  '/:userId',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      document: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      age: Joi.number(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return updateUserController.handle(req, res)
  },
)

userRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listUserController.handle(req, res)
  },
)

userRoute.delete(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return deleteUserController.handle(req, res)
  },
)

userRoute.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return loginUserController.handle(req, res)
  },
)

export { userRoute }
