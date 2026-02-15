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

      test("should update task with null completedAt", async () => {
        const initialTask = {
          title: "Task Initial",
          description: "Introduce a new task",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id } = createResponse.body.data

        const updatedTask = {
          title: "task 1 updated",
          description: "Introduce a new task 1 updated",
          completedAt: null,
        }

        const response = await request(app)
          .put(`/api/tasks/${id}`)
          .send(updatedTask)

        expect(response.status).toBe(200)
        expect(response.body.data).toBeDefined()
        expect(response.body.data.completedAt).toBe(null)
        expect(response.body.data).toMatchObject({
          id,
          ...updatedTask,
        })
      })
    })

    describe("Error cases", () => {
      test("should return 404 for non-existent task", async () => {
        const nonExistentId = 999999

        const updates = {
          title: "Updated title",
          description: "Updated description",
          completedAt: null,
        }

        const response = await request(app)
          .put(`/api/tasks/${nonExistentId}`)
          .send(updates)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("status")
        expect(response.body.status).toBe("error")
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBe("Task not found")
      })

      test("should return 400 when missing required fields", async () => {
        const initialTask = {
          title: "Task Initial",
          description: "Introduce a new task",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id } = createResponse.body.data

        const response = await request(app).put(`/api/tasks/${id}`).send({})

        expect(response.status).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.status).toBeDefined()
        expect(response.body.status).toBe("error")
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Validation failed")

        expect(response.body.details.fieldErrors).toHaveProperty("title")
        expect(response.body.details.fieldErrors).toHaveProperty("description")
        expect(response.body.details.fieldErrors).toHaveProperty("completedAt")
      })
      test("should return 400 when title is empty", async () => {
        const initialTask = {
          title: "Task Initial",
          description: "Introduce a new task",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id } = createResponse.body.data

        const updatedTaskWithoutTitle = {
          description: "Introduce a new task 1 updated",
          completedAt: null,
        }

        const response = await request(app)
          .put(`/api/tasks/${id}`)
          .send(updatedTaskWithoutTitle)

        expect(response.status).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.status).toBeDefined()
        expect(response.body.status).toBe("error")
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Validation failed")

        expect(response.body.details.fieldErrors).toHaveProperty("title")
      })
      test("should return 400 when description is empty", async () => {
        const initialTask = {
          title: "Task Initial",
          description: "Introduce a new task",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id } = createResponse.body.data

        const updatedTaskWithoutDescription = {
          title: "task 1 updated",
          completedAt: null,
        }

        const response = await request(app)
          .put(`/api/tasks/${id}`)
          .send(updatedTaskWithoutDescription)

        expect(response.status).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.status).toBeDefined()
        expect(response.body.status).toBe("error")
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Validation failed")

        expect(response.body.details.fieldErrors).toHaveProperty("description")
      })

      test("should return 400 when completedAt is empty", async () => {
        const initialTask = {
          title: "Task Initial",
          description: "Introduce a new task",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id } = createResponse.body.data

        const updatedTaskWithoutCompletedAt = {
          title: "task 1 updated",
          description: "Introduce a new task",
        }

        const response = await request(app)
          .put(`/api/tasks/${id}`)
          .send(updatedTaskWithoutCompletedAt)

        expect(response.status).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.status).toBeDefined()
        expect(response.body.status).toBe("error")
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Validation failed")

        expect(response.body.details.fieldErrors).toHaveProperty("completedAt")
      })
      // test("should return 400 when completedAt is invalid data format", async () => {})
    })
  })
})
