const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const postModel = require("../models/post");
const adminModel = require("../models/admin");

adminModel.adminSchema.plugin(passportLocalMongoose);
  
const Admin = new mongoose.model("Admin", adminModel.adminSchema);
  
passport.use(Admin.createStrategy());
   
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

postModel.postSchema.index({
  title: "text",
  content: "text",
}, {
  weights: {
    title: 5,
    content: 1,
  },
});

const Post = new mongoose.model("Post", postModel.postSchema);

exports.getHome = (req, res) => {
  Post.find({category: "News"}).limit(2).then(newsData => {
    Post.find({category: "News"}).sort({createdAt: -1}).limit(1).then(firstData => {
      Post.find({category: "Tech"}).sort({ createdAt: -1 }).limit(6).then(techData => {
        Post.find({category: "Sport"}).sort({ createdAt: -1 }).limit(6).then(sportData =>{
          Post.find({category: "Health"}).sort({ createdAt: -1 }).limit(6).then(healthData => {
            Post.find({category: "Entertainment"}).sort({ createdAt: -1 }).limit(6).then(EnterData => {
              Post.find({category: "Life"}).sort({ createdAt: -1 }).limit(1).then(lifeData => {
                res.render("blog/home", {
                  firstPost: firstData,
                  newsPosts: newsData,
                  techPosts: techData,
                  sportPosts: sportData,
                  healthPosts: healthData,
                  enterPosts: EnterData,
                  lifePosts: lifeData
                });
              });
            });
          });
        });
      });
    });
  });
};

exports.getNews = (req, res) => {
  Post.find({category: "News"}).sort({createdAt: -1}).then(results => {
      res.render("blog/news", {
          posts: results
      });
  });
};

exports.getTech = (req, res) => {
  Post.find({category: "Tech"}).sort({createdAt: -1}).then(results => {
    res.render("blog/tech", {
        posts: results
    });
});
};

exports.getSport = (req, res) => {
  Post.find({category: "Sport"}).sort({createdAt: -1}).then(results => {
    res.render("blog/sport", {
        posts: results
    });
});
};

exports.getHealth = (req, res) => {
  Post.find({category: "health"}).sort({createdAt: -1}).then(results => {
    res.render("blog/health", {
        posts: results
    });
});
};

exports.getEntertainment = (req, res) => {
  Post.find({category: "Entertainment"}).sort({createdAt: -1}).then(results => {
    res.render("blog/entertainment", {
        posts: results
    });
});
};

exports.getExtra = (req, res) => {
  Post.find({category: "Life"}).sort({createdAt: -1}).limit(18).then(lifeData => {
    Post.find({category: "Stories"}).sort({createdAt: -1}).limit(6).then(storiesData => {
      res.render("blog/extra", {
        lifePosts: lifeData,
        storiesPosts: storiesData
      });
    });
  });
};

exports.getPost = (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, result){ 
    if (!err) {
      res.render("blog/post", {

        post: result
   
      });
    }
  });
}

exports.postRelSearchs = (req, res) => {
  const term = req.body.term;
  Post.find({
    $text: { $search: term },
  })
    .then(results => {
      res.render("blog/search", {
        posts: results
      });
    })
    .catch(e => console.log(e))
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