import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import 'dotenv/config'
import { UserRepository } from '@user/repositories/UserRepository'
import { container } from 'tsyringe'

const userRepository = container.resolve(UserRepository)

interface DecodedPasswordResult {
  password: string
  iat: string
  email: string
}

function createPasswordJwt(email: string, password: string, secret: string) {
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

async function decodedPassword(
  passwordLogin: string,
  emailLogin: string,
): Promise<any> {
  const user = await userRepository.findByEmail(emailLogin)
  if (!user) {
    return false
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, password, iat } = await decodeCriptPassword(
    user.password,
    process.env.SECRET,
  )
  if (email === emailLogin && password === passwordLogin) {
    return true
  } else {
    return false
  }
}

async function decodeCriptPassword(
  token: string,
  secret: string,
): Promise<DecodedPasswordResult> {
  const decodedToken = jwt.verify(
    token,
    secret,
  ) as unknown as DecodedPasswordResult
  return decodedToken
}

async function tokenVerify(bearerToken: string) {
  const token = bearerToken.replace('Bearer ', '')
  const user = await userRepository.findByToken(token)
  console.log('user', user)
  if (!user) {
    return false
  } else {
    return true
  }
}

export {
  createJwtToken,
  createPasswordJwt,
  decodeCriptPassword,
  decodedPassword,
  tokenVerify,
}
