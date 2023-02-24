const {ethers} = require("ethers")
const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")

const getMessage = async (req, res) => {
    const {id} = req.params
    const user = await User.findOne({_id: id})
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: "error",
            msg: "User not found"
        }).select("username")
    }

    const generateMessage = `Hello ${user.username}, welcome to the NFT market. Message code is ${Date.now()}`
    await User.findByIdAndUpdate(id, {
        message: generateMessage
    })

    res.status(StatusCodes.OK).send({
        status: "success",
        data: {
            msg: generateMessage
        }
    })
}

const verifySig = async (req, res) => {

    const {signature, id, account} = req.body
    const user = await User.findById(id).select("message")
    
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: "error",
            msg: "User not found"
        })
    }    

    const conta = ethers.verifyMessage(user.message,signature)
    if (conta == account) {
        res.status(StatusCodes.OK).send({
            status: "success",
            data: {
                msg: "Valid signature"
            }
        })
    } else {
        res.status(StatusCodes.NOT_ACCEPTABLE).send({
            status: "success",
            data: {
                msg: "Signature not valid"
            }
        })
    }

}

module.exports = {verifySig, getMessage} 