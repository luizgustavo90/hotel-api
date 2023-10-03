import { CreateUserController } from '@user/controllers/create-user-controller'
import { ListUserController } from '@user/controllers/list-user-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const usersRoute = Router()
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUserController)

usersRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
    }),
  }),
  (req, res) => {
    return createUserController.handle(req, res)
  },
)

usersRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listUsersController.handle(req, res)
  },
)

export { usersRoute }
