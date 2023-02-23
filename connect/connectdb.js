const mongoose = require("mongoose")

const connectedDB = async (url) => {

    return await mongoose.connect(url)

}

module.exports = connectedDB