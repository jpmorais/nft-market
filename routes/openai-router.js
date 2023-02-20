const express = require("express")
const { newImage } = require("../controllers/openai-controller")
const router = express.Router()


router.route("/").post(newImage)

module.exports = router