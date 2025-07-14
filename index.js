import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { fileURLToPath } from "url"
import path from "path"
dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))

// import routes
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Serer Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your dist folder after Vite build
const distPath = path.join(__dirname, 'dist');

// Serve Static Files (after building with Vite)
app.use(express.static(distPath));

// For all other routes, serve the index.html (for frontend routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})