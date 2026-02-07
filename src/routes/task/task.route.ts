import { Router } from "express"
import * as taskController from "../../controllers/task/task.controller"
const router = Router()

router.post("/", taskController.create)

export default router
