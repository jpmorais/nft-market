const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")
const bcrypt = require("bcrypt")
const saltRounds = 10

const addUser = async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        res.status(StatusCodes.BAD_REQUEST).send({
            msg: "Username or password not provided"
        })
    }

    const hashPassword = await bcrypt.hash(password, saltRounds)
    if (!hashPassword) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            msg: "Erro ao cadastrar usuário"
        })
    }
    
    const newUser = await User.create({
        username: username,
        password: hashPassword
    }) 
    res.status(StatusCodes.CREATED).send({
        msg: "user created"
    })
}

const listUsers = async (req, res) => {
    const users = await User.find({}).select('username isAdmin')
    res.status(StatusCodes.OK).send(users)
}

module.exports = {addUser, listUsers}