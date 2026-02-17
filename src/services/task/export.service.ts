import type { Task } from "../../../generated/prisma/client"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"

function format(date: Date) {
  return date
    .toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\//g, "-")
    .replace(/:/g, "h")
    .replace(/,/g, "")
}

export class ExportService {
  async generateTasksPdfReport(tasks: Task[]): Promise<typeof PDFDocument> {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    })

    const formattedDate = new Date()
      .toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/\//g, "-")
      .replace(":", "h")
      .replace(",", "")

    const pageWidth = 595
    const margin = 50

    doc.fontSize(24).text("Tasks - Report", { continued: true })
    doc
      .fontSize(10)
      .fillColor("#c8c8c8")
      .text(formattedDate, margin, 60, {
        width: pageWidth - margin * 2,
        align: "right",
      })

    doc
      .strokeColor("#c8c8c8")
      .lineWidth(1)
      .moveTo(margin, doc.y + 10)
      .lineTo(pageWidth - margin, doc.y + 10)
      .stroke()
      .moveDown(3)

    tasks.forEach((task) => {
      doc.fontSize(11).fillColor("#000000").text(task.title)
      doc.fontSize(9).fillColor("#000000").text(task.description)
      doc
        .fontSize(9)
        .fillColor("#000000")
        .text(`Created at: ${format(task.createdAt!)}`)
      doc
        .fontSize(9)
        .fillColor("#000000")
        .text(`Status: ${task.complete ? "Complete" : "Pending"}`)
      doc.fontSize(8).fillColor("#000000").text(`ID: #${task.id}`)
      doc.moveDown(1)
    })

    doc.end()

    return doc
  }

  async generateBasicPdf(): Promise<string> {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    })

    const filePath = path.join(process.cwd(), "tmp", "exports", "example.pdf")
    const stream = fs.createWriteStream(filePath)

    doc.pipe(stream)
    doc.text("Hello World")
    doc.end()

    await new Promise<void>((resolve, reject) => {
      stream.on("finish", resolve)
      stream.on("error", reject)
    })

    return filePath
  }

  async generateTextExamples(): Promise<string> {
    const doc = new PDFDocument({ size: "A4", margin: 50 })
    const filePath = path.join(
      process.cwd(),
      "tmp",
      "exports",
      "text-examples.pdf",
    )
    const stream = fs.createWriteStream(filePath)
    doc.pipe(stream)

    // === TEXTO BÁSICO ===
    doc.text("Texto normal")

    // === FONTES ===
    doc.font("Helvetica-Bold").text("Texto em negrito")
    doc.font("Helvetica-Oblique").text("Texto em itálico")
    doc.font("Helvetica").text("Texto normal novamente")

    // Fontes disponíveis:
    // - Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique
    // - Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic
    // - Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique

    // === TAMANHO ===
    doc.fontSize(24).text("Título Grande")
    doc.fontSize(18).text("Subtítulo")
    doc.fontSize(12).text("Texto normal")

    // === CORES ===
    doc.fillColor("red").text("Texto vermelho")
    doc.fillColor("#3498db").text("Texto azul (hex)")
    doc.fillColor("black").text("Texto preto novamente")

    // === POSICIONAMENTO ===
    doc.text("Texto na posição (100, 400)", 100, 400)

    // === ALINHAMENTO ===
    doc.text("Texto centralizado", { align: "center" })
    doc.text("Texto à direita", { align: "right" })
    doc.text(
      "Texto justificado lorem ipsum dolor sit amet consectetur adipiscing elit",
      {
        align: "justify",
        width: 400,
      },
    )

    // === ESPAÇAMENTO ===
    doc.moveDown() // Pula 1 linha
    doc.text("Texto após 1 linha")
    doc.moveDown(2) // Pula 2 linhas
    doc.text("Texto após 2 linhas")

    doc.end()

    await new Promise<void>((resolve, reject) => {
      stream.on("finish", resolve)
      stream.on("error", reject)
    })

    return filePath
  }

  async generateShapesExamples(): Promise<string> {
    const doc = new PDFDocument({ size: "A4", margin: 50 })
    const filePath = path.join(
      process.cwd(),
      "tmp",
      "exports",
      "shapes-examples.pdf",
    )
    const stream = fs.createWriteStream(filePath)
    doc.pipe(stream)

    // === LINHAS HORIZONTAIS ===
    doc
      .strokeColor("#cccccc") // Cor da linha
      .lineWidth(1) // Espessura
      .moveTo(50, 100) // Ponto inicial (x, y)
      .lineTo(545, 100) // Ponto final (x, y)
      .stroke() // Desenhar

    // === LINHAS VERTICAIS ===
    doc
      .strokeColor("red")
      .lineWidth(2)
      .moveTo(100, 150)
      .lineTo(100, 300)
      .stroke()

    // === RETÂNGULOS ===
    doc
      .rect(150, 150, 200, 100) // (x, y, largura, altura)
      .stroke() // Apenas contorno

    doc.rect(150, 300, 200, 100).fillAndStroke("blue", "black") // Preenchido + contorno

    // === CÍRCULOS ===
    doc
      .circle(450, 200, 50) // (x, y, raio)
      .stroke()

    // === BORDAS ARREDONDADAS ===
    doc
      .roundedRect(150, 450, 200, 100, 10) // (x, y, w, h, radius)
      .stroke()

    doc.end()

    await new Promise<void>((resolve, reject) => {
      stream.on("finish", resolve)
      stream.on("error", reject)
    })

    return filePath
  }

  async generateTableExample(): Promise<string> {
    const doc = new PDFDocument({ size: "A4", margin: 10 })
    const filePath = path.join(
      process.cwd(),
      "tmp",
      "exports",
      "table-example.pdf",
    )
    const stream = fs.createWriteStream(filePath)
    doc.pipe(stream)

    // === CONFIGURAÇÕES DA TABELA ===
    const tableTop = 10
    const tableLeft = 10
    const rowHeight = 30
    const colWidths = [50, 200, 150, 150] // Larguras das colunas

    // === HEADER ===
    let currentY = tableTop

    // Fundo do header
    doc
      .rect(
        tableLeft,
        currentY,
        colWidths.reduce((a, b) => a + b, 0),
        rowHeight,
      )
      .fillAndStroke("#3498db", "#2c3e50")

    // Texto do header
    doc.fillColor("white").fontSize(12).font("Helvetica-Bold")

    doc.text("ID", tableLeft + 5, currentY + 10, { width: colWidths[0] })
    doc.text("Title", tableLeft + colWidths[0] + 5, currentY + 10, {
      width: colWidths[1],
    })
    doc.text(
      "Description",
      tableLeft + colWidths[0] + colWidths[1] + 5,
      currentY + 10,
      { width: colWidths[2] },
    )
    doc.text(
      "Status",
      tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 5,
      currentY + 10,
      { width: colWidths[3] },
    )

    currentY += rowHeight

    // === ROWS ===
    const data = [
      {
        id: 1,
        title: "Buy groceries",
        description: "Milk and bread",
        status: "Pending",
      },
      {
        id: 2,
        title: "Finish project",
        description: "Complete API",
        status: "Done",
      },
      {
        id: 3,
        title: "Call dentist",
        description: "Schedule appointment",
        status: "Pending",
      },
    ]

    doc.fillColor("black").fontSize(10).font("Helvetica")

    data.forEach((row, index) => {
      // Fundo alternado
      if (index % 2 === 0) {
        doc
          .rect(
            tableLeft,
            currentY,
            colWidths.reduce((a, b) => a + b),
            rowHeight,
          )
          .fill("#ecf0f1")
      }

      // Bordas das células
      let currentX = tableLeft
      colWidths.forEach((width) => {
        doc.rect(currentX, currentY, width, rowHeight).stroke()
        currentX += width
      })

      // Texto das células
      doc.fillColor("black")
      doc.text(row.id.toString(), tableLeft + 5, currentY + 10, {
        width: colWidths[0],
      })
      doc.text(row.title, tableLeft + colWidths[0] + 5, currentY + 10, {
        width: colWidths[1],
      })
      doc.text(
        row.description,
        tableLeft + colWidths[0] + colWidths[1] + 5,
        currentY + 10,
        { width: colWidths[2] },
      )
      doc.text(
        row.status,
        tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 5,
        currentY + 10,
        { width: colWidths[3] },
      )

      currentY += rowHeight
    })

    doc.end()

    await new Promise<void>((resolve, reject) => {
      stream.on("finish", resolve)
      stream.on("error", reject)
    })

    return filePath
  }
}

export default new ExportService()
