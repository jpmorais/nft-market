require("dotenv").config()
const express = require("express")
const server = express()


server.get("/", (req, res) => {
    res.send("Hello from server")
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})
