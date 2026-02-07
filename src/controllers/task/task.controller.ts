import { HttpError } from "../../errors/httpError"
import taskService from "../../services/task/task.service"
import type { Request, Response, NextFunction } from "express"

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description } = req.body

    if (!title || !description) {
      throw new HttpError(400, "Bad request")
    }

    const task = await taskService.create({
      title,
      description,
    })

    return res.status(201).json({
      status: "success",
      data: task,
    })
  } catch (error) {
    next(error)
  }
}
