import { Response } from 'express'

export function ErrorMessage(
  res: Response,
  message: string,
  status: number,
  detail?: string,
) {
  return res.status(status).json({
    statusCode: status,
    message: message,
    detail: detail,
  })
}
export class AppError {
  public message: string
  public statusCode: number
  public detail?: string

  constructor(message: string, status: number, detail?: string) {
    this.statusCode = status
    this.message = message
    this.detail = detail
  }
}
