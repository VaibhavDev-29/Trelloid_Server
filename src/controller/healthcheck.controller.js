import { ApiResponce } from "../utils/api-response.js"


const healthcheck = (req, res) => {
    res.status(200).json(new ApiResponce(200, { message : "Server is running"} ))
}

export default healthcheck