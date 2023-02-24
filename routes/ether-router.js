const express = require("express")
const { verifySig, getMessage } = require("../controllers/ether-controller")
const router = express.Router()

router.route("/verify").post(verifySig)
router.route("/message/:id").get(getMessage)

module.exports = router