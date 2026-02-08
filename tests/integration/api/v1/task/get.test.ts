import request from "supertest"
import app from "../../../../../src/app"
import { orchestrator } from "../../../../orchestrator"

beforeEach(async () => {
  await orchestrator.setup()
})

afterAll(async () => {
  await orchestrator.tearDown()
})

describe("GET /api/tasks", () => {
  describe("Anonymous user", () => {
    test("should list all tasks", async () => {
      await request(app).post("/api/tasks").send({
        title: "task 1",
        description: "Introduce a new task 1",
      })

      await request(app).post("/api/tasks").send({
        title: "task 2",
        description: "Introduce a new task 2",
      })

      await request(app).post("/api/tasks").send({
        title: "task 3",
        description: "Introduce a new task 3",
      })

      const response = await request(app).get("/api/tasks")

      expect(response.status).toBe(200)
      expect(response.body.status).toBeDefined()
      expect(response.body.data).toBeDefined()

      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data).length(3)
    })
  })
})
