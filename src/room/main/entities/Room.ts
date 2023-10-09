import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('room')
export class Room {
  @PrimaryColumn()
  rommNo: number
  @Column()
  type: string
  @Column()
  value: number
  @Column()
  status: string
  @Column()
  createdAt: string

  constructor() {
    if (!this.rommNo) {
      this.rommNo = Math.floor(Math.random() * 100) + 1
    }
  }
}
