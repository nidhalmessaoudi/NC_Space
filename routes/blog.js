const express = require("express");

const blogController = require("../controllers/siteData");

const router = express.Router();

router.get("/", blogController.getHome);
  
router.get("/news", blogController.getNews);
  
router.get("/tech", blogController.getTech);
  
router.get("/sport", blogController.getSport);
  
router.get("/health", blogController.getHealth);
  
router.get("/entertainment", blogController.getEntertainment);
  
router.get("/extra", blogController.getExtra);

module.exports = router;