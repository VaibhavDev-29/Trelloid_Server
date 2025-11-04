import express from "express"

const app = express()

// router imports
import healthcheckrouter from "./routes/healthcheck.routes.js"

app.use("/api/v1/healthcheck", healthcheckrouter)


export default app