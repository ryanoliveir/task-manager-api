import taskRepository from "../../repositories/task/task.repository"
import { createTaskSchema, type CreateTaskDto } from "../../schemas/task.schema"
import { readFile } from "../../utils/files"
import type { Task } from "../../../generated/prisma/client"
import fs from "node:fs/promises"
import { HttpError } from "../../errors/httpError"

interface ValidationError {
  row: number
  data: unknown
  errors: string[]
}

interface ImportResult {
  success: number
  failed: number
  total: number
  errors?: ValidationError[]
  createdTasks?: Task[]
}

interface ValidationResult {
  validTasks: CreateTaskDto[]
  errors: ValidationError[]
}

export class ImportService {
  constructor(private repository = taskRepository) {}

  async importTasksFromCsvFile(
    file: Express.Multer.File,
  ): Promise<ImportResult> {
    try {
      const records = await readFile(file.path)
      const result = this.proccesAndImport(records)
      return result
    } finally {
      await fs.unlink(file.path).catch(() => {})
    }
  }

  private async proccesAndImport(records: unknown[]): Promise<ImportResult> {
    const { validTasks, errors } = this.validatedRecords(records)

    if (errors.length > 0) {
      return {
        success: 0,
        failed: errors.length,
        total: records.length,
        errors,
      }
    }

    try {
      const createdTasks = await taskRepository.createMany(validTasks)

      return {
        success: createdTasks.length,
        failed: 0,
        total: records.length,
        createdTasks,
      }
    } catch (error) {
      throw new HttpError(500, `Database error during import: ${error}`)
    }
  }

  private validatedRecords(records: unknown[]): ValidationResult {
    const validTasks: CreateTaskDto[] = []
    const validationErrors: ValidationError[] = []

    records.forEach((record, index) => {
      const result = createTaskSchema.safeParse(record)

      if (!result.success) {
        const errors = result.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`,
        )

        validationErrors.push({
          row: index + 2,
          data: record,
          errors,
        })
      } else {
        validTasks.push(result.data)
      }
    })

    return {
      validTasks,
      errors: validationErrors,
    }
  }
}

export default new ImportService()
