import request from "supertest"
import app from "../../../../../src/app"
import { orchestrator } from "../../../../orchestrator"

beforeEach(async () => {
  await orchestrator.setup()
})

afterAll(async () => {
  await orchestrator.tearDown()
})

afterAll(async () => {
  await orchestrator.tearDown()
})

describe("PUT /api/tasks/:id", () => {
  describe("Anonymous user", () => {
    describe("Success cases", () => {
      test("should update a task", async () => {
        const initialTask = {
          title: "task 1",
          description: "Introduce a new task 1",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id } = createResponse.body.data

        const updatedTask = {
          title: "task 1 updated",
          description: "Introduce a new task 1 updated",
          completedAt: new Date().toISOString(),
        }

        const response = await request(app)
          .put(`/api/tasks/${id}`)
          .send(updatedTask)

        expect(response.status).toBe(200)
        expect(response.body.data).toBeDefined()
        expect(response.body.data).toMatchObject({
          id,
          ...updatedTask,
        })
      })

      test("should update task with null completedAt", async () => {})
      test("should update task with null completeAt", async () => {})
    })

    describe("Error cases", () => {
      test("should return 400 when missing required fields", async () => {})
      test("should return 400 when title is empty", async () => {})
      test("should return 400 when description is empty", async () => {})
      test("should return 400 when completedAt is invalid data format", async () => {})
    })
  })
})
