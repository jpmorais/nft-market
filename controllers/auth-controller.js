const jwt = require("jsonwebtoken");
require("dotenv").config();
const {StatusCodes} = require("http-status-codes")
const User = require("../models/user")

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Login or password not provided"
    })
  }

  const user = await User.findOne({
    username: username,
    password: password
  })

  console.log(user)
  if (user) {
    const token = jwt.sign({
      username: user.username,
      isadmin: user.isAdmin
    }, process.env.SECRET)
    res.status(StatusCodes.OK).send({
      token: token
    })
  }
  else {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: "user not found"
    })
  }

};

const authenticate = async (req, res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
        
        const {username, isadmin} = jwt.verify(token, process.env.SECRET)
        if (isadmin) {
            next()
        } else {
            res.status(StatusCodes.UNAUTHORIZED).send({msg: "Not authorized"})
        }
    }
    else {
        res.status(StatusCodes.UNAUTHORIZED).send({msg: "Not authorized"})
    }    
}

module.exports = { login, authenticate };
