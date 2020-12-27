require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const adminSchema = new mongoose.Schema ({
  email: String,
  password: String
});

adminSchema.plugin(passportLocalMongoose);

const Admin = new mongoose.model("Admin", adminSchema);

passport.use(Admin.createStrategy());
 
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.get("/tech", (req, res) => {
  res.render("tech");
});

app.get("/sport", (req, res) => {
  res.render("sport");
});

app.get("/health", (req, res) => {
  res.render("health");
});

app.get("/entertainment", (req, res) => {
  res.render("entertainment");
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }

});
app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
})

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})

app.post("/login", (req, res) => {
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

app.listen(3000, () => {
    console.log("Server started on port 3000.");
  });