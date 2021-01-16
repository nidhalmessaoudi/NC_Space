const mongoose = require("mongoose");

exports.adminSchema = new mongoose.Schema ({
    email: String,
    password: String
});