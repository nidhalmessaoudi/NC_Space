const express = require("express");

const topicController = require("../controllers/topic");

const router = express.Router();

router.get("/terms", topicController.getTerms);

router.get("/privacy", topicController.getPrivacy);

router.get("/feedback", topicController.getFeedback);

router.get("/advertise", topicController.getAdvertise);

router.get("/support", topicController.getSupport);

router.get("/developers", topicController.getDevelopers);

router.get("/help", topicController.getHelp);

router.get("/about", topicController.getAbout);

router.post("/feedback", topicController.postFeedback);


module.exports = router;