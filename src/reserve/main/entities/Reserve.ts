import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('reserve')
export class Reserve {
  @PrimaryColumn()
  id: string
  @Column()
  rommNo: number
  @Column()
  guestId: string
  @Column()
  checkIn: string
  @Column()
  checkOut: string
  @Column()
  totalCost: number

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
