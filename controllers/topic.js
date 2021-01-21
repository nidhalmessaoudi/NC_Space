const express  = require("express");
const mongoose = require("mongoose");
const feedbackModel = require("../models/feedback");

exports.getTerms = (req, res) => {
    res.render("topics/terms");
}

exports.getPrivacy = (req, res) => {
    res.render("topics/privacy");
}
exports.getFeedback = (req, res) => {
    res.render("topics/feedback");
}
exports.getAdvertise = (req, res) => {
    res.render("topics/advertise");
}
exports.getSupport = (req, res) => {
    res.render("topics/support");
}
exports.getDevelopers = (req, res) => {
    res.render("topics/developers");
}
exports.getHelp = (req, res) => {
    res.render("topics/help");
}
exports.getAbout = (req, res) => {
    res.render("topics/about");
}
exports.postFeedback = (req, res) => {
    const feedSubj = req.body.subject;
    const feedContent = req.body.feedback;

    const feedback = new feedbackModel.Feedback({
        subject: feedSubj,
        content: feedContent
    });
    feedback.save(err => {
        if(!err) {
            res.render("topics/success", {
                success: "Feedback sent successfully!",
                successMessage: "Thank you for giving us part of your time to evaluate our work and provide your feedback. We promise we read it well.",
                successButton: "Go to the homePage",
                path: "/"
            });
        } else {
            res.render("topics/failure", {
                error: "A problem occurred while sending the feedback!",
                errorMessage: "Maybe you are missing entering the feedback message, please try sending again.",
                path: "/feedback"
            });
        }
    });
}