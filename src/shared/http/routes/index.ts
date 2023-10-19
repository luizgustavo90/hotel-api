import { Router } from 'express'
import { guestsRoute } from '@guest/http/routes/guest.routes'
import { roomsRoute } from '@room/http/routes/room.routes'
import { reserveRoute } from '@reserve/http/routes/reserve.routes'
import { userRoute } from '@user/http/routes/user.routes'

const routes = Router()

routes.get('/', () => (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/guest', guestsRoute)
routes.use('/room', roomsRoute)
routes.use('/reserve', reserveRoute)
routes.use('/user', userRoute)

export { routes }
