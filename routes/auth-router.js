const express = require("express")
const { login, authenticate } = require("../controllers/auth-controller")
const router = express.Router()

router.route("/login").post(login)
router.route("/auth").post(authenticate)

module.exports = router