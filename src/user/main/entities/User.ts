import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string
  @Column()
  name: string
  @Column()
  department: string
  @Column()
  email: string
  @Column()
  password: string
  @Column()
  token?: string

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
