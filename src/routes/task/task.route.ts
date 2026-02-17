import { Router } from "express"
import * as taskController from "../../controllers/task/task.controller"
import {
  validatedBody,
  validateParams,
  validateQuery,
} from "../../middlewares/validate.middleware"
import {
  createTaskSchema,
  exportQuerySchema,
  taskFiltersSchema,
  taskIdSchema,
  taskUpdatePartialSchema,
  taskUpdateSchema,
  taskUpdateStatus,
} from "../../schemas/task.schema"
import * as importController from "../../controllers/task/import.controller"
import * as exportControler from "../../controllers/task/export.controller"
import { upload } from "../../lib/multer"

const router = Router()

router.post("/", validatedBody(createTaskSchema), taskController.create)
router.get("/", validateQuery(taskFiltersSchema), taskController.list)
router.get(
  "/export",
  validateQuery(exportQuerySchema),
  exportControler.exportPDF,
)

router.get("/:id", validateParams(taskIdSchema), taskController.getById)
router.patch(
  "/:id",
  validateParams(taskIdSchema),
  validatedBody(taskUpdatePartialSchema),
  taskController.update,
)
router.patch(
  "/:id/complete",
  validatedBody(taskUpdateStatus),
  taskController.update,
)
router.put(
  "/:id",
  validateParams(taskIdSchema),
  validatedBody(taskUpdateSchema),
  taskController.replace,
)
router.delete("/:id", validateParams(taskIdSchema), taskController.remove)

router.post("/import", upload.single("file"), importController.importCsv)

export default router
