export interface ValidationErrorDetails {
  fieldErrors: Record<string, string[]>
  formErrors?: string[]
}

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    massage: string,
    public details?:
      | ValidationErrorDetails
      | Record<string, unknown>
      | Array<unknown>,
  ) {
    super(massage)
    this.name = "HttpError"
  }
}
