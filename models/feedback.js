const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema ({
    subject: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});
exports.Feedback = new mongoose.model("Feedback", feedbackSchema);