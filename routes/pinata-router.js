const express = require("express")
const { publishJSON } = require("../controllers/pinata-controller")
const {authenticate} = require("../controllers/auth-controller")
const router = express.Router()

router.route("/").post(authenticate, publishJSON)

module.exports = router