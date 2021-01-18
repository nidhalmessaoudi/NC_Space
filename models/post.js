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
    tagOne: {
        type: String,
        required: false
    },
    tagTwo: {
        type: String,
        required: false
    },
    tagThree: {
        type: String,
        required: false
    },
    tagFour: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true 
    },
}, {timestamps: true});