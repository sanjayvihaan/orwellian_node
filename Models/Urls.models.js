const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    url: String,
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Url', urlSchema)