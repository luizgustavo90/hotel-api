export class AppError {
  public message: string
  public statusCode: number

  constructor(message: string, statusCode = 400) {
    this.statusCode = statusCode
    this.message = message
  }
}
