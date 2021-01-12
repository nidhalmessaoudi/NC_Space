const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const router = express.Router();

router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

const adminSchema = new mongoose.Schema ({
  email: String,
  password: String
});

adminSchema.plugin(passportLocalMongoose);

const Admin = new mongoose.model("Admin", adminSchema);

passport.use(Admin.createStrategy());
 
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

router.get("/login", (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      res.render("admin/login");
    }
});

router.get("/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("admin/dashboard");
    } else {
      res.redirect("/login");
    }
});

router.post("/dashboard", (req, res) => {
  const title = req.body.postTitle;
  const category = req.body.postCategorie;
  const image = req.file;
  const content = req.body.postContent; 
  const imageUrl = image.path;
  const post = new Post({
      title: title,
      category: category,
      image: imageUrl,
      content: content
  });
  post.save(err => {
      if (!err) {
          console.log("Post Saved Successfully");
      } else {
          console.log(err);
      }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/login", (req, res) => {
  const admin = new Admin( {
    username: req.body.username,
    password: req.body.password
  });
  req.login(admin, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
          res.redirect("/dashboard");
        })
    }
  })
});

module.exports = router;



