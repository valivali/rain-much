import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local first (if it exists), then fallback to .env
// Path is relative to the backend directory (two levels up from src/config)
const envLocalPath = join(__dirname, "..", "..", ".env.local")
const envPath = join(__dirname, "..", "..", ".env")

const localResult = dotenv.config({ path: envLocalPath })
const envResult = dotenv.config({ path: envPath })

// Log if .env.local was loaded (for debugging)
if (localResult.parsed) {
  console.log("✅ Loaded environment variables from .env.local")
} else if (envResult.parsed) {
  console.log("✅ Loaded environment variables from .env")
} else {
  console.warn("⚠️  No environment files found (.env.local or .env)")
}

