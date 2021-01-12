const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("blog/home");
});
  
router.get("/news", (req, res) => {
    res.render("blog/news");
});
  
router.get("/tech", (req, res) => {
    res.render("blog/tech");
});
  
router.get("/sport", (req, res) => {
    res.render("blog/sport");
});
  
router.get("/health", (req, res) => {
    res.render("blog/health");
});
  
router.get("/entertainment", (req, res) => {
    res.render("blog/entertainment");
});
  
router.get("/extra", (req, res) => {
    res.render("blog/extra");
});

module.exports = router;