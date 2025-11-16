// Load environment variables FIRST before any other imports
import "./config/env.js"

// Now import other modules that may use environment variables
import express, { type Express, type Request, type Response } from "express"
import cors from "cors"
import helmet from "helmet"
import weatherRoutes from "./routes/weatherRoutes.js"

const app: Express = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Rain Much API is running!" })
})

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" })
})

app.use("/api/weather", weatherRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

