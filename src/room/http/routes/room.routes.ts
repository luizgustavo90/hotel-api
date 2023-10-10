import { CreateRoomController } from 'src/room/controllers/create-room-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ListRoomByParamController } from '@room/controllers/list-room-by-param-controller'
import { ListRoomController } from '@room/controllers/list-room-controller'

const roomsRoute = Router()
const createRoomController = container.resolve(CreateRoomController)
const listRoomByParamController = container.resolve(ListRoomByParamController)
const listRoomController = container.resolve(ListRoomController)

roomsRoute.post(
  '/:type',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      type: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return createRoomController.handle(req, res)
  },
)
roomsRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listRoomController.handle(req, res)
  },
)

roomsRoute.get(
  '/filter',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      type: Joi.string().optional(),
      rommNo: Joi.number().optional(),
      status: Joi.string().optional(),
    }),
  }),
  (req, res) => {
    return listRoomByParamController.handle(req, res)
  },
)

export { roomsRoute }
