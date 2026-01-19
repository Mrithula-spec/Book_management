import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import bookRoutes from "./routes/bookRoutes.js"
import { fileURLToPath } from "url";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import booklistRoutes from "./routes/booklistRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js"

dotenv.config()
connectDB()

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())
app.use("/image", express.static(path.join(__dirname, "public/image")))

app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/booklist", booklistRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
