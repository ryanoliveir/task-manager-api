import fs from "fs"
import path from "path"

const categories = [
  {
    prefix: "Buy",
    items: [
      "groceries",
      "books",
      "office supplies",
      "electronics",
      "furniture",
      "clothing",
      "tools",
      "plants",
    ],
  },
  {
    prefix: "Fix",
    items: [
      "bug",
      "issue",
      "error",
      "problem",
      "leak",
      "door",
      "window",
      "code",
    ],
  },
  {
    prefix: "Update",
    items: [
      "documentation",
      "resume",
      "website",
      "database",
      "dependencies",
      "profile",
      "settings",
      "portfolio",
    ],
  },
  {
    prefix: "Review",
    items: [
      "pull request",
      "code",
      "document",
      "proposal",
      "contract",
      "design",
      "architecture",
      "implementation",
    ],
  },
  {
    prefix: "Write",
    items: [
      "blog post",
      "documentation",
      "report",
      "email",
      "article",
      "proposal",
      "summary",
      "guide",
    ],
  },
  {
    prefix: "Call",
    items: [
      "dentist",
      "doctor",
      "client",
      "supplier",
      "manager",
      "accountant",
      "lawyer",
      "contractor",
    ],
  },
  {
    prefix: "Schedule",
    items: [
      "meeting",
      "appointment",
      "interview",
      "demo",
      "presentation",
      "call",
      "review",
      "training",
    ],
  },
  {
    prefix: "Research",
    items: [
      "technology",
      "competitor",
      "market",
      "tools",
      "framework",
      "library",
      "API",
      "service",
    ],
  },
  {
    prefix: "Implement",
    items: [
      "feature",
      "authentication",
      "validation",
      "caching",
      "logging",
      "monitoring",
      "testing",
      "API",
    ],
  },
  {
    prefix: "Deploy",
    items: [
      "application",
      "website",
      "API",
      "service",
      "database",
      "server",
      "container",
      "pipeline",
    ],
  },
]

const descriptions = [
  "Complete task with high priority",
  "This is an important task that needs attention",
  "Follow up on previous discussion",
  "Requires coordination with team",
  "Critical for next sprint",
  "Low priority but should be done",
  "Waiting for client approval",
  "Needs to be completed by end of week",
  "Part of ongoing project",
  "Quick task that can be done today",
  "Blocked by external dependency",
  "Requires additional research",
  "Needs stakeholder review",
  "Should be completed before release",
  "Technical debt that needs addressing",
  "Customer requested feature",
  "Performance optimization needed",
  "Security improvement required",
  "Documentation update needed",
  "Code refactoring opportunity",
]

function generateTasks(count: number): string {
  const lines = ["title,description"]

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]

    if (!category) {
      return "category is not available"
    }

    const item =
      category.items[Math.floor(Math.random() * category.items.length)]
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)]

    const title = `${category.prefix} ${item} #${i}`
    const fullDescription = `${description} - Task ${i} of ${count}`

    lines.push(`${title},${fullDescription}`)
  }

  return lines.join("\n")
}

function main() {
  const count = 1000
  const csv = generateTasks(count)
  const filePath = path.join(process.cwd(), "tasks-1000.csv")

  fs.writeFileSync(filePath, csv, "utf-8")

  console.log(`✅ Generated ${count} tasks in: ${filePath}`)
  console.log(`📊 File size: ${(csv.length / 1024).toFixed(2)} KB`)
}

main()
