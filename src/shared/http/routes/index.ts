import { Router } from 'express'
import { usersRoute } from '@user/http/routes/user.routes'

const routes = Router()

routes.get('/', () => (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/user', usersRoute)

export { routes }
