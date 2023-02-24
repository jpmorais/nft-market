const express = require("express")
const { addUser, listUsers } = require("../controllers/user-controller")
const {authenticate} = require("../controllers/auth-controller")
const router = express.Router()

router.route("/").post(addUser).get(authenticate, listUsers)

module.exports = router