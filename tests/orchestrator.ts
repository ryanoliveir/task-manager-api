import prisma from "../src/lib/prisma"
import { execSync } from "child_process"

class Orchestrator {
  async setup() {
    try {
      await this.clearDatabase()
      await this.runMigrations()
      await this.tearDown()
    } catch (error) {
      console.log("Orchestrator setup failed: ", error)
    }
  }

  private async clearDatabase(): Promise<void> {
    console.log("✓ Dropping schema...")
    await prisma.$executeRaw`DROP SCHEMA IF EXISTS local CASCADE;`

    console.log("✓ Creating schema...")
    await prisma.$executeRaw`CREATE SCHEMA local;`
  }

  private async runMigrations(): Promise<void> {
    try {
      execSync(`npm run  prisma:migrations:deploy`, {
        stdio: "inherit",
      })
    } catch (error) {
      console.error("Migrations failed:", error)
    }
  }

  async tearDown(): Promise<void> {
    try {
      await prisma.$disconnect()
    } catch (error) {
      console.error("Failed to disconnect", error)
    }
  }
}

export const orchestrator = new Orchestrator()
