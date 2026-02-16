import fs from "fs"
import CsvParser from "csv-parser"
export async function readFile(filePath: string): Promise<unknown[]> {
  const result: unknown[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(CsvParser())
      .on("data", (data) => result.push(data))
      .on("end", () => {
        resolve()
      })
      .on("error", (error) => reject(error))
  })

  return result
}
