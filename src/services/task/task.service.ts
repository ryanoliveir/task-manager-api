import taskRespository, {
  type CreatedTaskData,
} from "../../repositories/task/task.repository"

export class TaskService {
  constructor(private repository = taskRespository) {}

  async create(data: CreatedTaskData) {
    return await this.repository.create(data)
  }

  async listAll() {
    return await this.repository.listAll()
  }
}

export default new TaskService()
