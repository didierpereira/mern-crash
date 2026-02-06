import cors from "cors"
import express from "express"
import path from "path"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()

import productsRouter from "./routes/product.route.js"

const app = express()

const __dirname = path.resolve()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRouter)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

const startServer = async () => {
  try {
    await connectDB()
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
