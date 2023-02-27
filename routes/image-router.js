const express = require("express")
const { uploadImage } = require("../controllers/image-controller")
const {authenticate} = require("../controllers/auth-controller")

const router = express.Router()

router.route("/").post(authenticate, uploadImage)

module.exports = router