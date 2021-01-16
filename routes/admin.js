const express = require("express");
const session = require("express-session");
const passport = require("passport");

const router = express.Router();

const adminController = require("../controllers/siteData");

router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/login", adminController.getLogin);

router.get("/dashboard", adminController.getDashboard);

router.post("/dashboard", adminController.postDashboard);

router.get("/logout", adminController.getLogOut);

router.post("/login", adminController.postLogin);

module.exports = router;



