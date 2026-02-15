import { z } from "zod"

export const createTaskSchema = z
  .object({
    title: z.string().min(1, { error: "Title is required" }),
    description: z.string().min(1, { error: "Description is required" }),
  })
  .strict()

export const taskFiltersSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .strict()

export const taskIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a number")
    .transform((value) => parseInt(value, 10))
    .pipe(z.number().positive()),
})

export const taskUpdateSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    completedAt: z.iso.datetime().nullable(),
    complete: z.boolean(),
  })
  .strict()

export const taskUpdatePartialSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    completedAt: z.iso.datetime().optional(),
  })
  .strict()

export type CreateTaskDto = z.infer<typeof createTaskSchema>
export type UpdateTask = z.infer<typeof taskUpdateSchema>
export type UpdatePartialTask = z.infer<typeof taskUpdatePartialSchema>
export type TaskFilters = z.infer<typeof taskFiltersSchema>
export type TaskId = z.infer<typeof taskIdSchema>
