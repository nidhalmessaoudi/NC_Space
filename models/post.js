const mongoose = require("mongoose");

exports.postSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true 
    },
    image: {
        type: String,
        required: true 
    },
    content: {
        type: String,
        required: true 
    },
}, {timestamps: true});