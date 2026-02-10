import prisma from "../../lib/prisma"
import type { Prisma, Task } from "../../../generated/prisma/client"
import type {
  CreateTaskDto,
  TaskFilters,
  UpdatePartialTask,
  UpdateTask,
} from "../../schemas/task.schema"

export class TaskRepository {
  async create(data: CreateTaskDto): Promise<Task> {
    const result = prisma.task.create({
      data: {
        ...data,
      },
    })

    return result
  }

  async listAll(filters?: TaskFilters): Promise<Task[]> {
    const where: Prisma.TaskWhereInput = {}

    if (filters?.title) {
      where.title = {
        contains: filters.title,
        mode: "insensitive",
      }
    }

    if (filters?.description) {
      where.title = {
        contains: filters.description,
        mode: "insensitive",
      }
    }

    console.log(where)

    return await prisma.task.findMany({
      where: {
        ...(filters?.title && {
          title: {
            contains: filters.title,
            mode: "insensitive",
          },
        }),
        ...(filters?.description && {
          description: {
            contains: filters.description,
            mode: "insensitive",
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async getById(taskId: number) {
    return await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })
  }

  async replace(taskId: number, data: UpdateTask) {
    return await prisma.task.update({
      where: { id: taskId },
      data,
    })
  }

  async update(taskId: number, data: UpdatePartialTask) {
    return await prisma.task.update({
      where: { id: taskId },
      data,
    })
  }
}

export default new TaskRepository()
