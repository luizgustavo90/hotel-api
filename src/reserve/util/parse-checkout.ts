import { Guest } from '@guest/main/entities/Guest'
import { Reserve } from '@reserve/main/entities/Reserve'
import { CheckOutDTO } from '@reserve/main/entities/types'

export function parseCheckout(reserve: Reserve, guest: Guest): CheckOutDTO {
  const totalCostWithDecimals = reserve.totalCost.toFixed(2)
  const result = {
    message: `Thanks four your visit!`,
    guestId: guest.id,
    name: guest.name,
    email: guest.email,
    phone: guest.phone,
    roomNo: reserve.rommNo,
    checkIn: reserve.checkIn,
    checkOut: reserve.checkOut,
    costDetail: `Total costs R$:${totalCostWithDecimals}`,
  }

  return result
}
