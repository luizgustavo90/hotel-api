import { Router } from 'express'
import { guestsRoute } from '@guest/http/routes/guest.routes'

const routes = Router()

routes.get('/', () => (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/guest', guestsRoute)

export { routes }
