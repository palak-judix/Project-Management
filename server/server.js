require("dotenv").config()

const app = require("./src/app")
const connectDB = require("./src/config/db")
const projectRoutes = require("./src/features/projects/project.routes")

app.use("/api", projectRoutes)

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

