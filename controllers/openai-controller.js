const { Configuration, OpenAIApi } = require("openai");

const newImage = async (req, res) => {

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);
  
    const {prompt} = req.body
    console.log(`prompt ${prompt}`)
  
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
  
    const retorno = {
      status: "success",
      data: {
        url: response.data["data"][0]["url"]
      }
    }

    res.send(retorno);      
  } catch (error) {
    res.status(500).send("Error ", error)
  }
};

module.exports = { newImage };
