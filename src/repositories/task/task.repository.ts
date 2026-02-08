import prisma from "../../lib/prisma"
import type { Task } from "../../../generated/prisma/client"

export interface CreatedTaskData {
  title: string
  description: string
}

export class TaskRepository {
  async create(data: CreatedTaskData): Promise<Task> {
    const result = prisma.task.create({
      data: {
        ...data,
      },
    })

    return result
  }

  async listAll(): Promise<Task[]> {
    return await prisma.task.findMany()
  }
}

export default new TaskRepository()
