import 'dotenv/config'
import 'reflect-metadata'
import { app } from './app'
import { dataSource } from '../typeorm'

dataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server sartinhg in the port:  ${process.env.PORT}! `)
  })
})
