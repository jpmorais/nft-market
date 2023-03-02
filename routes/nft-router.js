const express = require("express")
const { mintNFT } = require("../controllers/nft-controller")
const {authenticate} = require("../controllers/auth-controller")
const router = express.Router()

router.route("/").post(authenticate, mintNFT)

module.exports = router