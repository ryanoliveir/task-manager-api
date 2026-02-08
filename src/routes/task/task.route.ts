import { Router } from "express"
import * as taskController from "../../controllers/task/task.controller"
const router = Router()

router.post("/", taskController.create)
router.get("/", taskController.list)

export default router
