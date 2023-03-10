require("dotenv").config()
require("express-async-errors")
const {StatusCodes} = require("http-status-codes")
const express = require("express")
const server = express()
const cors = require("cors")

server.use(cors())
server.use(express.json())

const nftRouter = require("./routes/nft-router")
server.use("/api/v1/nft", nftRouter)

const imageRouter = require("./routes/image-router")
server.use("/api/v1/images", imageRouter)

const pinataRouter = require("./routes/pinata-router")
server.use("/api/v1/ipfs", pinataRouter)

const openaiRouter = require("./routes/openai-router")
server.use("/api/v1/openai", openaiRouter)

const authRouter = require("./routes/auth-router")
const connectedDB = require("./connect/connectdb")
server.use("/api/v1/auth", authRouter)

const userRouter = require("./routes/user-router")
server.use("/api/v1/user", userRouter)

const etherRouter = require("./routes/ether-router")
server.use("/api/v1/ether", etherRouter)

server.get("/", (req, res) => {
    res.send("Hello from server")
})

server.use((error, req, res, next) => {
    res.status(StatusCodes.BAD_REQUEST).send({
        msg: error.message
    })
})

try {
    connectedDB(process.env.MONGO_URI)
    const PORT = process.env.PORT || 4000
    server.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`)
    })        
} catch (error) {
    
}

