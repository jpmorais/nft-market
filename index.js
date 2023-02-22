require("dotenv").config()
const express = require("express")
const server = express()

server.use(express.json())

const openaiRouter = require("./routes/openai-router")
server.use("/api/v1/openai", openaiRouter)

const authRouter = require("./routes/auth-router")
server.use("/api/v1/auth", authRouter)

server.get("/", (req, res) => {
    res.send("Hello from server")
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})
