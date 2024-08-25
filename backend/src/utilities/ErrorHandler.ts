class ApiError extends Error {
  statusCode: number
  data: any
  success: boolean
  errors: any[]

  constructor(
    statusCode: number,
    message: string = 'Something Went Wrong',
    errors: any[] = []
  ) {
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.success = false
    this.errors = errors
  }
}

export default ApiError
