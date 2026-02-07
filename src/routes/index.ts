import { Router } from "express"
import task from "./task/task.route"
const router = Router()

router.use("/tasks", task)

export default router
