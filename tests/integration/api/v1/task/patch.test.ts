import request from "supertest"
import app from "../../../../../src/app"
import { orchestrator } from "../../../../orchestrator"

beforeEach(async () => {
  await orchestrator.setup()
})

afterAll(async () => {
  await orchestrator.tearDown()
})

describe("PATCH /api/tasks/:id", () => {
  describe("Anonymous user", () => {
    describe("Success cases", async () => {
      test("should update only tittle", async () => {
        const initialTask = {
          title: "Original task title",
          description: "Original description",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id, description } = createResponse.body.data

        const updates = {
          title: "Updated title only",
        }

        const response = await request(app)
          .patch(`/api/tasks/${id}`)
          .send(updates)

        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        expect(response.body.data).toMatchObject({
          id,
          title: "Updated title only",
          description: description,
          completedAt: null,
        })
        expect(response.body.data.description).toBe(initialTask.description)
      })

      test("should update only description", async () => {
        const initialTask = {
          title: "Original title",
          description: "Original description",
        }

        const createResponse = await request(app)
          .post("/api/tasks")
          .send(initialTask)

        const { id, title } = createResponse.body.data

        const updates = {
          description: "Updated description only",
        }

        const response = await request(app)
          .patch(`/api/tasks/${id}`)
          .send(updates)

        // Assert
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        expect(response.body.data).toMatchObject({
          id,
          title: title,
          description: "Updated description only",
          completedAt: null,
        })
        expect(response.body.data.title).toBe(initialTask.title)
      })
    })

    describe("Error cases", async () => {
      test("should return 404 for non-existent task", async () => {})
      test("should return 404 for invalid task ID format", async () => {})
      test("should return 400 when title is empty string", async () => {})
      test("should return 400 when description is empty string", async () => {})
      test("should return 400 when completedAt is invalid date format", async () => {})
      test("should return 400 when sending extra fields", async () => {})
      test("should return 400 when title exceeds max length", async () => {})
      test("should return 400 when description exceeds max length", async () => {})
    })
  })
})
