import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('room')
export class Room {
  @PrimaryColumn()
  roomNo: number
  @Column()
  type: string
  @Column()
  value: string
  @Column()
  status: string

  constructor() {
    if (!this.roomNo) {
      this.roomNo = Math.floor(Math.random() * 100) + 1
    }
  }
}
