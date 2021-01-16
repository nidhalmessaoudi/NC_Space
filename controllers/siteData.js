const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const adminSchema = new mongoose.Schema ({
    email: String,
    password: String
});
  
adminSchema.plugin(passportLocalMongoose);
  
const Admin = new mongoose.model("Admin", adminSchema);
  
passport.use(Admin.createStrategy());
   
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true 
    },
    image: {
        type: String,
        required: true 
    },
    content: {
        type: String,
        required: true 
    },
}, {timestamps: true});
  
const Post = new mongoose.model("Post", postSchema);

exports.getHome = (req, res) => {
  res.render("blog/home");
};

exports.getNews = (req, res) => {
  Post.find({category: "News"}, (err, results) => {
      res.render("blog/news", {
          posts: results
      });
  });
};

exports.getTech = (req, res) => {
  Post.find({category: "Tech"}, (err, results) => {
    res.render("blog/tech", {
        posts: results
    });
});
};

exports.getSport = (req, res) => {
  Post.find({category: "Sport"}, (err, results) => {
    res.render("blog/sport", {
        posts: results
    });
});
};

exports.getHealth = (req, res) => {
  Post.find({category: "health"}, (err, results) => {
    res.render("blog/health", {
        posts: results
    });
});
};

exports.getEntertainment = (req, res) => {
  Post.find({category: "Entertainment"}, (err, results) => {
    res.render("blog/entertainment", {
        posts: results
    });
});
};

exports.getExtra = (req, res) => {
  res.render("blog/extra");
};

exports.getLogin = (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      res.render("admin/login");
    }
};

exports.getDashboard = (req, res) => {
    if (req.isAuthenticated()) {
      res.render("admin/dashboard");
    } else {
      res.redirect("/login");
    }
};

exports.postDashboard = (req, res) => {
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
};

exports.getLogOut = (req, res) => {
    req.logout();
    res.redirect("/");
};

exports.postLogin = (req, res) => {
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
};