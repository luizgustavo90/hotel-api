import { Router } from 'express'
import { guestsRoute } from '@guest/http/routes/guest.routes'
import { roomsRoute } from '@room/http/routes/room.routes'

const routes = Router()

routes.get('/', () => (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/guest', guestsRoute)
routes.use('/room', roomsRoute)

export { routes }
