const mongoose = require("mongoose");



const bookSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    
},
{Timestamp: true}
);

const books = mongoose.model("books",bookSchema);
module.exports = books;