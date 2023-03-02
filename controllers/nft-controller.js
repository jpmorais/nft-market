require("dotenv").config()
const endereco = "0x8fAA3dbf1Eb643Caf691B1a7D25d6074A4020BA9"
const {ethers} = require("ethers")
const {StatusCodes} = require("http-status-codes")
const uriProvider = process.env.ALCHEMY_PROVIDER

const mintNFT = async (req, res) => {

    const ABI = [
        "function safeMint(address to, string memory uri) public",
        "function name() public view returns (string memory)"
    ]

    const {to, uri} = req.body
    if (!to || !uri) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: "error",
            msg: "fields not provided"
        })
    }

    const provider = new ethers.JsonRpcProvider(uriProvider)
    let signer = new ethers.Wallet(process.env.PRIVATE_KEY)
    signer = signer.connect(provider)

    const contract = new ethers.Contract(endereco, ABI, signer)
    const retorno = await contract.safeMint(to,uri)
    await retorno.wait(1)
    console.log(retorno)
 
    res.status(StatusCodes.CREATED).send({
        status: "success",
        data: {
            msg: "NFT Mintada com sucesso"
        }
    })
}

module.exports = {mintNFT}