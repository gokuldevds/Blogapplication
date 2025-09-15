const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    author: String, 
    imageurl:String,
});
module.exports = mongoose.model('blog', blogSchema)
