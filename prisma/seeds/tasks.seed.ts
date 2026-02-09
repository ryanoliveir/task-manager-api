// prisma/seed.ts
import prisma from "../../src/lib/prisma/index"

const tasks = [
  {
    title: "Create authentication endpoint",
    description: "Implement JWT authentication with refresh tokens",
  },
  {
    title: "Setup database migrations",
    description: "Create initial database schema using Prisma",
  },
  {
    title: "Build user registration feature",
    description: "Add email validation and password hashing",
  },
  {
    title: "Implement error handling middleware",
    description: "Create centralized error handling for Express",
  },
  {
    title: "Add unit tests for user service",
    description: "Write comprehensive tests using Vitest",
  },
  {
    title: "Create API documentation",
    description: "Document all endpoints using OpenAPI specification",
  },
  {
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing",
  },
  {
    title: "Implement rate limiting",
    description: "Add rate limiting middleware to prevent abuse",
  },
  {
    title: "Build email notification system",
    description: "Create service for sending transactional emails",
  },
  {
    title: "Add logging infrastructure",
    description: "Implement structured logging with Winston",
  },
  {
    title: "Create admin dashboard endpoint",
    description: "Build endpoints for admin user management",
  },
  {
    title: "Implement file upload feature",
    description: "Add support for uploading images and documents",
  },
  {
    title: "Setup monitoring and alerts",
    description: "Configure application monitoring with error tracking",
  },
  {
    title: "Build search functionality",
    description: "Implement full-text search across database",
  },
  {
    title: "Create data export feature",
    description: "Allow users to export their data in CSV format",
  },
  {
    title: "Implement caching layer",
    description: "Add Redis caching to improve performance",
  },
  {
    title: "Add API versioning",
    description: "Implement versioning strategy for API endpoints",
  },
  {
    title: "Build webhook system",
    description: "Create webhook delivery system for external integrations",
  },
  {
    title: "Implement password reset flow",
    description: "Add secure password reset with email verification",
  },
  {
    title: "Create backup automation",
    description: "Setup automated database backups to cloud storage",
  },
]

async function main() {
  console.log("🌱 Starting seed...")

  // Limpar dados existentes
  await prisma.task.deleteMany()
  console.log("🗑️  Cleared existing tasks")

  // Criar tasks
  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    })
  }

  console.log(`✅ Created ${tasks.length} tasks`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
