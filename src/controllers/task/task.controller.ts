import { HttpError } from "../../errors/httpError"
import taskService from "../../services/task/task.service"
import {
  taskIdSchema,
  taskUpdatePartialSchema,
  taskUpdateSchema,
  type TaskFilters,
} from "../../schemas/task.schema"
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

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = req.query as TaskFilters
    const tasks = await taskService.listAll(filters)

    return res.status(200).json({
      status: "success",
      data: tasks,
    })
  } catch (error) {
    next(error)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = taskIdSchema.parse(req.params)

    const task = await taskService.getById(id)

    return res.status(200).json({
      status: "success",
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = taskIdSchema.parse(req.params)
    const data = taskUpdatePartialSchema.parse(req.body)

    const task = await taskService.update(id, data)
    return res.status(200).json({
      status: "success",
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

export async function replace(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = taskIdSchema.parse(req.params)
    const data = taskUpdateSchema.parse(req.body)

    const task = await taskService.replace(id, data)
    return res.status(200).json({
      status: "success",
      data: task,
    })
  } catch (error) {
    next(error)
  }
}
