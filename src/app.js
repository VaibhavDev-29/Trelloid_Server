import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// router imports
import healthcheckrouter from "./routes/healthcheck.routes.js"
import authrouter from "./routes/auth.route.js"

app.use("/api/v1/healthcheck", healthcheckrouter)
app.use("/api/v1/auth", authrouter)


export default app