import type { Request, Response, NextFunction } from "express"
import type { TaskFilters } from "../../schemas/task.schema"
import taskService from "../../services/task/task.service"
import exportService from "../../services/task/export.service"

export async function exportPDF(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const filter = req.query as TaskFilters
    const tasks = await taskService.listAll(filter)

    const pdfStream = await exportService.generateTasksPdfReport(tasks)

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="tasks-report.pdf"`,
    )

    pdfStream.pipe(res)
  } catch (error) {
    next(error)
  }
}
