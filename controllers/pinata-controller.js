require("dotenv").config()
const axios = require("axios")
const URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
const {StatusCodes} = require("http-status-codes")

const publishJSON = async (req, res) => {
    
    const {description, image, name, attributes} = req.body
    const payload = {
        description,
        image,
        name,
        attributes
    }

    var config = {
        method: 'post',
        url: URL,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${process.env.PINATA_JWT}`
        },
        data : payload
      };
    const retorno = await axios(config)    
    const data = await retorno.data
    
    const resposta = {
        status: "Success",
        data: {
            ipfsHash: data.IpfsHash
        }
    }
    
    res.status(StatusCodes.CREATED).send(resposta)

}

module.exports = {publishJSON}