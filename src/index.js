import app from "./app.js"
import dotenv from "dotenv"
import conectDb from "./db/connectdb.js"



dotenv.config({
    path : "./.env"
})


const port = process.env.PORT || 4000

conectDb()
    .then(() => {
        app.listen(port, () => {console.log(`server is running on port ${port}`);
        })
    })
    .catch((err) => {
        console.error("mongodb connection erro", err)
        process.exit(1)
    })
