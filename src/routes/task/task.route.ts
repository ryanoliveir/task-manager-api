import { Router } from "express"
import * as taskController from "../../controllers/task/task.controller"
import {
  validatedBody,
  validateParams,
  validateQuery,
} from "../../middlewares/validate.middleware"
import {
  createTaskSchema,
  taskFiltersSchema,
  taskIdSchema,
  taskUpdatePartialSchema,
  taskUpdateSchema,
} from "../../schemas/task.schema"
const router = Router()

router.post("/", validatedBody(createTaskSchema), taskController.create)
router.get("/", validateQuery(taskFiltersSchema), taskController.list)
router.get("/:id", validateParams(taskIdSchema), taskController.getById)
router.patch(
  "/:id",
  validateParams(taskIdSchema),
  validatedBody(taskUpdatePartialSchema),
  taskController.update,
)
router.put(
  "/:id",
  validateParams(taskIdSchema),
  validatedBody(taskUpdateSchema),
  taskController.replace,
)

export default router
