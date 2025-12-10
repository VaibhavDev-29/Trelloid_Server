import express from "express"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// router imports
import healthcheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.route.js"
import projectRouter from "./routes/project.route.js"


app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/projects", projectRouter)


export default app