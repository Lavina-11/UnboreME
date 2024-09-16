const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    title: String,
    info: String,
    price: String,
    rating: String,
    status: String,
    category: String,
    img: String
})

module.exports = mongoose.model('Activity', ActivitySchema)