require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const multer = require("multer");

const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blog");


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

app.use(blogRoutes);

app.use(adminRoutes);


app.use((req, res) => {
  res.status(404).render("404Page");
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});


