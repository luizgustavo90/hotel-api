import { CreateRoomController } from 'src/room/controllers/create-room-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ListRoomByParamController } from '@room/controllers/list-room-by-param-controller'
import { ListRoomController } from '@room/controllers/list-room-controller'
import { DeleteRoomController } from '@room/controllers/delete-room-controller'

const roomsRoute = Router()
const createRoomController = container.resolve(CreateRoomController)
const listRoomByParamController = container.resolve(ListRoomByParamController)
const listRoomController = container.resolve(ListRoomController)
const deleteRoomController = container.resolve(DeleteRoomController)

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
      roomNo: Joi.number().optional(),
      status: Joi.string().optional(),
      page: Joi.number().optional(),
    }),
  }),
  (req, res) => {
    return listRoomByParamController.handle(req, res)
  },
)

roomsRoute.delete(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      roomNo: Joi.number().required(),
    }),
  }),
  (req, res) => {
    return deleteRoomController.handle(req, res)
  },
)

export { roomsRoute }
