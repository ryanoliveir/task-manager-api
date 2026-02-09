import taskRespository from "../../repositories/task/task.repository"
import type { CreateTaskDto, TaskFilters } from "../../schemas/task.schema"

export class TaskService {
  constructor(private repository = taskRespository) {}

  async create(data: CreateTaskDto) {
    return await this.repository.create(data)
  }

  async listAll(filters?: TaskFilters) {
    return await this.repository.listAll(filters)
  }
}

export default new TaskService()
