const cloudinary = require("cloudinary").v2;
const {StatusCodes} = require("http-status-codes")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


const uploadImage = async (req, res) => {
  const { url, name } = req.body;

  const response = cloudinary.uploader.upload(url, { public_id: name });

  response
    .then((data) => {
      const resposta = {
        status: "Success",
        data: {
            url: data.secure_url
        }
      }
      res.status(StatusCodes.CREATED).send(resposta)
    })
    .catch((err) => {
      const resposta = {
        status: "Error",
        msg: err.message
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta)
    });
};

// const insertText = async (req, res) => {
//   try {
//     const { id, text, color } = req.body;
//     console.log(req.body)
//     const response = cloudinary.image(id, {
//       overlay: {
//         font_family: "Arial",
//         font_size: 100,
//         font_weight: "bold",
//         text: text,
//       },
//       gravity: "north_west",
//       x: 20,
//       y: 20,
//       color: color,
//     });
//     res.send(response);
//   } catch (error) {
//     res.status(500).send(`Error ${error}`)
//   }
// };

// const getMetadata = async (req, res) => {
//   const response = cloudinary.api.resource("oldman.png");
//   response
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((error) => {
//       res.send(error);
//     });
// };

module.exports = {uploadImage}