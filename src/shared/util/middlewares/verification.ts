import { container } from 'tsyringe'
import { GuestRepository } from '@guest/repositories/GuestRepository'
import { RoomRepository } from '@room/repositories/RoomReposisory'
import { ErrorMessage } from '@shared/errors/error-standard'
import { Response } from 'express'
import { ReserveRepository } from '@reserve/repositories/ReserveRepository'

const guestRepository = container.resolve(GuestRepository)
const roomRepository = container.resolve(RoomRepository)
const reserveRepository = container.resolve(ReserveRepository)

export async function guestIdVerify(
  res: Response,
  guestId: string,
): Promise<any> {
  const guest = await guestRepository.findById(guestId)
  if (!guest) {
    throw ErrorMessage(res, 'Guest doesn`t exists!', 404, 'guestId invalid')
  }
}

export async function guestReserveVerify(
  res: Response,
  guestId: string,
): Promise<any> {
  const guest = await reserveRepository.findByGuestId(guestId)
  if (guest) {
    throw ErrorMessage(res, 'Guest already has a reserve!', 404)
  }
}

export async function emailVerify(res: Response, email: string): Promise<any> {
  const guest = await guestRepository.findByEmail(email)

  if (guest) {
    throw ErrorMessage(
      res,
      'Guest already exists!',
      404,
      'email found in database',
    )
  }
}

export async function roomVerify(res: Response, roomNo: number): Promise<any> {
  const room = await roomRepository.findByNumber(roomNo)

  if (!room) {
    throw ErrorMessage(res, 'Room doesn`t exists', 404, 'roomId invalid')
  }
}

export async function roomEmptyVerify(
  res: Response,
  roomNo: number,
): Promise<any> {
  const room = await roomRepository.findByNumber(roomNo)

  if (room.status !== 'Livre') {
    throw ErrorMessage(res, 'This room is already occupied!', 404)
  }
}

export async function roomAccordVerify(
  res: Response,
  roomNo: number,
  type: string,
): Promise<any> {
  const room = await roomRepository.findByNumber(roomNo)

  if (room.type !== type) {
    throw ErrorMessage(res, 'This room is not according you need (type)', 404)
  }
}
