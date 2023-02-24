const express = require("express")
const { addUser, listUsers, changeAdminStatus } = require("../controllers/user-controller")
const {authenticate} = require("../controllers/auth-controller")
const router = express.Router()

router.route("/").post(addUser).get(authenticate, listUsers)
router.route("/isadmin/:id").patch(authenticate, changeAdminStatus)

module.exports = router