import { CreateGuestController } from '@guest/controllers/create-guest-controller'
import { ListGuestController } from '@guest/controllers/list-guest-controller'
import { UpdateGuestController } from '@guest/controllers/update-guest-controller'
import { DeleteGuestController } from '@guest/controllers/delete-guest-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const guestsRoute = Router()
const createGuestController = container.resolve(CreateGuestController)
const listGuestController = container.resolve(ListGuestController)
const updateGuestController = container.resolve(UpdateGuestController)
const deleteGuestController = container.resolve(DeleteGuestController)

guestsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      document: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      age: Joi.number().required(),
    }),
  }),
  (req, res) => {
    return createGuestController.handle(req, res)
  },
)

guestsRoute.put(
  '/:guestId',
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
    return updateGuestController.handle(req, res)
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

guestsRoute.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return deleteGuestController.handle(req, res)
  },
)
export { guestsRoute }
