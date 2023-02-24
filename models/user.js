const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true    
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    account: {
        type: String,
        unique: true
    },
    message: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)