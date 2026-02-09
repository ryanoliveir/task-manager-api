import { Router } from "express"
import * as taskController from "../../controllers/task/task.controller"
import { validatedBody } from "../../middlewares/validate.middleware"
import { createTaskSchema } from "../../schemas/task.schema"
const router = Router()

router.post("/", validatedBody(createTaskSchema), taskController.create)
router.get("/", taskController.list)

export default router
