import { HttpError } from "../../errors/httpError"
import taskRespository from "../../repositories/task/task.repository"
import type {
  CreateTaskDto,
  TaskFilters,
  UpdatePartialTask,
  UpdateTask,
} from "../../schemas/task.schema"

export class TaskService {
  constructor(private repository = taskRespository) {}

  async create(data: CreateTaskDto) {
    return await this.repository.create(data)
  }

  async listAll(filters?: TaskFilters) {
    return await this.repository.listAll(filters)
  }

  async getById(taskId: number) {
    const task = await this.repository.getById(taskId)

    if (!task) throw new HttpError(404, "Task not found")

    return task
  }

  async update(taskId: number, data: UpdatePartialTask) {
    const task = await this.repository.getById(taskId)

    if (!task) throw new HttpError(404, "Task not found")

    return this.repository.update(taskId, data)
  }

  async replace(taskId: number, data: UpdateTask) {
    const task = await this.repository.getById(taskId)

    if (!task) throw new HttpError(404, "Task not found")

    return this.repository.replace(taskId, data)
  }

  async delete(taskId: number) {
    const task = await this.repository.getById(taskId)

    if (!task) throw new HttpError(404, "Task not found")

    return await this.repository.delete(taskId)
  }
}

export default new TaskService()
