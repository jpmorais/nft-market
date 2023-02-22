const jwt = require("jsonwebtoken");
require("dotenv").config();
const {StatusCodes} = require("http-status-codes")

const login = async (req, res) => {
  const { login, senha } = req.body;
  if (login == "src" && senha == "srcsiga") {
    const token = jwt.sign(
      {
        login: "src",
      },
      process.env.SECRET
    );
    res.send(token);
  } else {
    res.send("Not login");
  }
};

const authenticate = async (req, res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
        
        const {login} = jwt.verify(token, process.env.SECRET)
        if (login=="src") {
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
