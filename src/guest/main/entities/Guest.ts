import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('guest')
export class Guest {
  @PrimaryColumn()
  id: string
  @Column()
  name: string
  @Column()
  document: string
  @Column()
  email: string
  @Column()
  phone: string
  @Column()
  age: number
  @Column()
  roomNo: number

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
