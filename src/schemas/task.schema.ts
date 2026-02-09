import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  description: z.string().min(1, { error: "Description is required" }),
})

export const taskFiltersSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

export type CreateTaskDto = z.infer<typeof createTaskSchema>
export type TaskFilters = z.infer<typeof taskFiltersSchema>
