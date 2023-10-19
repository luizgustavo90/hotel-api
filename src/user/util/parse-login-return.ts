import { User } from '@user/main/entities/User'
import { LoginUserReturn } from '@user/main/entities/types'

export function parseLoginUser(user: User): LoginUserReturn {
  const result = {
    name: user.name,
    department: user.department,
    email: user.email,
    token: user.token,
  }

  return result
}
