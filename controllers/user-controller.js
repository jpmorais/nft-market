const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")

const addUser = async (req, res) => {
    const {username, password} = req.body
    const newUser = await User.create({
        username: username,
        password: password
    }) 
    res.status(StatusCodes.CREATED).send(newUser)
}

module.exports = {addUser}