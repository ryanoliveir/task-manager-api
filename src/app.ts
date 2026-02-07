import express from "express"
const app = express()
import morgan from "morgan"

app.use(morgan("dev"))

app.get("/api/status", (req, res) => {
  res.status(200).json({
    status: "success",
    updated_at: new Date(),
  })
})

export default app
