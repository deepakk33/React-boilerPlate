export interface ApiResponse<T> {
  status: number
  payload: T
  message?: string
}

export interface ErrorPayload {
  message: string
  status: number
  timeStamp: number
}
