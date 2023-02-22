const express = require("express")
const { newImage } = require("../controllers/openai-controller")
const {authenticate} = require("../controllers/auth-controller")
const router = express.Router()


const testeAuth = (req, res) => {
    res.send("teste auth")
}

router.route("/").post([authenticate, newImage])


module.exports = router