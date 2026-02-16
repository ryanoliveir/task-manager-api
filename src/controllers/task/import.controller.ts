import type { Request, Response, NextFunction } from "express"
import importService from "../../services/task/import.service"
import { HttpError } from "../../errors/httpError"

export async function importCsv(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) {
      throw new HttpError(400, "No file uploaded")
    }

    const result = await importService.importTasksFromCsvFile(req.file)

    if (result.failed > 0) {
      return res.send(400).send({
        status: "error",
        message: `Validation failed: ${result.failed} invalid rows`,
        details: result.errors,
      })
    }

    return res.status(200).json({
      status: "success",
      message: `Import complete: ${result.success} tasks created`,
      data: result.createdTasks,
    })
  } catch (error) {
    next(error)
  }
}
