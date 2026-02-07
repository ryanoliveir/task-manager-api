export class HttpError extends Error {
  constructor(
    public statusCode: number,
    massage: string,
  ) {
    super(massage)
  }
}
