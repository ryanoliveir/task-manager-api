import request from "supertest"
import app from "../../../../../src/app"
import { orchestrator } from "../../../../orchestrator"

beforeEach(async () => {
  await orchestrator.setup()
})

describe("POST /api/tasks", () => {
  describe("Anonymous user", () => {
    test("should create a task and return 201", async () => {
      const payload = {
        title: "Create a new endpoint",
        description: "Create a endpoint to introduce a new task",
      }

      const response = await request(app)
        .post("/api/tasks")
        .send(payload)
        .expect(201)

      expect(response.body).toBeDefined()
      expect(response.body.status).toBeDefined()
      expect(response.body.data).toBeDefined()
      expect(response.body).toMatchObject({
        status: "success",
        data: expect.any(Object),
      })
    })
  })
})
