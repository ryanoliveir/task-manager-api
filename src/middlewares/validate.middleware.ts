import type { Response, Request, NextFunction } from "express"
import { ZodType, flattenError } from "zod"
import { HttpError } from "../errors/httpError"

export function validatedBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const { fieldErrors, formErrors } = flattenError(result.error)

      return next(
        new HttpError(400, "Validation failed", {
          fieldErrors,
          ...(formErrors.length > 0 && { formErrors }),
        }),
      )
    }

    req.body = result.data
    next()
  }
}
