import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'

function createPasswordJwt(email: string, password: string, secret: string) {
  console.log('Starting createJwtToken', email, password, secret)
  const passwordJwt = jwt.sign(
    {
      email: email,
      password: password,
    },
    secret,
  )

  return passwordJwt
}

function createJwtToken(email: string, password: string) {
  console.log('Starting createJwtToken')
  const secretkey = randomBytes(64).toString('hex')
  const tokenJwt = jwt.sign(
    {
      email: email,
      password: password,
    },
    secretkey,
  )

  return tokenJwt
}

function decodeCriptPassword(password: string, secret: string) {
  const decodedPassword = jwt.verify(password, secret)
  return decodedPassword
}

export { createJwtToken, createPasswordJwt, decodeCriptPassword }
