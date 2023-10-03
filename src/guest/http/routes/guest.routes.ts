import { CreateGuestController } from '@guest/controllers/create-guest-controller'
import { ListGuestController } from '@guest/controllers/list-guest-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const guestsRoute = Router()
const createGuestController = container.resolve(CreateGuestController)
const listGuestController = container.resolve(ListGuestController)

guestsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
    }),
  }),
  (req, res) => {
    return createGuestController.handle(req, res)
  },
)

guestsRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listGuestController.handle(req, res)
  },
)

export { guestsRoute }
