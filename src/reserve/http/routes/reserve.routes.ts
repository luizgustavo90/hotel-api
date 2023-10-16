import { CheckInReserveController } from '@reserve/controllers/checkin-reserve-controller'
import { CheckOutReserveController } from '@reserve/controllers/checkout-reserve-controller'
import { ListReserveController } from '@reserve/controllers/list-reserve-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

export const reserveRoute = Router()
const checkInReserveController = container.resolve(CheckInReserveController)
const listReserveController = container.resolve(ListReserveController)
const checkOutReserveController = container.resolve(CheckOutReserveController)

reserveRoute.post(
  '/:guestId/:roomNo/:type',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      type: Joi.string().required(),
      guestId: Joi.string().required(),
      roomNo: Joi.number().required(),
    }),
    [Segments.QUERY]: Joi.object().keys({
      stay: Joi.number(),
    }),
  }),
  (req, res) => {
    return checkInReserveController.handle(req, res)
  },
)

reserveRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listReserveController.handle(req, res)
  },
)

reserveRoute.delete(
  '/:guestId/:roomNo',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      guestId: Joi.string().required(),
      roomNo: Joi.string().required(),
    }),
  }),
  (req, res) => {
    checkOutReserveController.handle(req, res)
  },
)
