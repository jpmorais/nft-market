const { Configuration, OpenAIApi } = require("openai");
const {StatusCodes} = require("http-status-codes")

const newImage = async (req, res) => {

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);
  
    const {prompt, size} = req.body
    console.log(`prompt ${prompt}`)
  
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: size,
    });
  
    const retorno = {
      status: "success",
      data: {
        url: response.data["data"][0]["url"]
      }
    }

    res.status(StatusCodes.CREATED).send(retorno);      

  } catch (error) {
    res.status(500).send({
      status: "error",
      msg: "error generating the image"
    })
  }
};

module.exports = { newImage };
