import { CreateRoomController } from 'src/room/controllers/create-room-controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const roomsRoute = Router()
const createRoomController = container.resolve(CreateRoomController)

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

export { roomsRoute }
