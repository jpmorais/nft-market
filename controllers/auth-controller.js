const jwt = require("jsonwebtoken");
require("dotenv").config();
const {StatusCodes} = require("http-status-codes")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Login or password not provided"
    })
  }

  const user = await User.findOne({
    username: username
  })

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).send({
      msg: "User not found"
    })
  }

  const isPasswordOk = await bcrypt.compare(password, user.password)

  if (!isPasswordOk) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      msg: "Not authenticated"
    })
  }

    const token = jwt.sign({
      username: user.username,
      isadmin: user.isAdmin
    }, process.env.SECRET)

    res.status(StatusCodes.OK).send({
      token: token
    })

};

const authenticate = async (req, res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      console.log(req.headers)  
      token = req.headers.authorization.split(" ")[1]
        
        const {username, isadmin} = jwt.verify(token, process.env.SECRET)
        if (isadmin) {
            next()
        } else {
            res.status(StatusCodes.UNAUTHORIZED).send({
              status: "error",
              data: {
                  msg: "Not authorized"
              }      
          })
        }
    }
    else {
        res.status(StatusCodes.UNAUTHORIZED).send({msg: "Not authorized"})
    }    
}

module.exports = { login, authenticate };
