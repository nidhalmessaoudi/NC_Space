const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const postModel = require("../models/post");
const adminModel = require("../models/admin");
const feedbackModel = require("../models/feedback");

adminModel.adminSchema.plugin(passportLocalMongoose);
  
const Admin = new mongoose.model("Admin", adminModel.adminSchema);
  
passport.use(Admin.createStrategy());
   
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

postModel.postSchema.index({
  title: "text",
  tagOne: "text",
  tagTwo: "text",
  content: "text"
  }, {
  weights: {
    title: 5,
    tagOne: 1,
    tagTwo: 1,
    content: 1
  },
});

const Post = new mongoose.model("Post", postModel.postSchema);

exports.getHome = async (req, res) => {
try {
    // RETREIVING POSTS
  const newsData = await Post.find({category: "News"}).limit(2);

  const firstData = await Post.find({category: "News"}).sort({createdAt: -1}).limit(1);

  const techData = await Post.find({category: "Tech"}).sort({ createdAt: -1 }).limit(6);

  const sportData = await Post.find({category: "Sport"}).sort({ createdAt: -1 }).limit(6);

  const healthData = await Post.find({category: "Health"}).sort({ createdAt: -1 }).limit(6);

  const entertainData = await Post.find({category: "Entertainment"}).sort({ createdAt: -1 }).limit(6);

  const lifeData = await Post.find({category: "Life"}).sort({ createdAt: -1 }).limit(1);

  const storiesData = await Post.find({category: "Stories"}).sort({ createdAt: -1 }).limit(4);


  // RENDERING POSTS
  res.render("blog/home", {
    firstPost: firstData,
    newsPosts: newsData,
    techPosts: techData,
    sportPosts: sportData,
    healthPosts: healthData,
    enterPosts: entertainData,
    lifePosts: lifeData,
    storiesPosts: storiesData
  });
} catch (err) {
  console.error(err);
}


};

exports.getNews = async (req, res) => {
  try {
    const results = await Post.find({category: "News"}).sort({createdAt: -1});
    res.render("blog/news", {
      posts: results
  });
  } catch (err) {
    console.error(err);
  }
};

exports.getTech = async (req, res) => {
  try {
    const results = await Post.find({category: "Tech"}).sort({createdAt: -1});
    res.render("blog/tech", {
      posts: results
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getSport = async (req, res) => {
  try {
    const results = await Post.find({category: "Sport"}).sort({createdAt: -1});
    res.render("blog/sport", {
      posts: results
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getHealth = async (req, res) => {
  try {
    const results = await Post.find({category: "Health"}).sort({createdAt: -1});
    res.render("blog/health", {
      posts: results
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getEntertainment = async (req, res) => {
  try {
    const results = await Post.find({category: "Entertainment"}).sort({createdAt: -1});
    res.render("blog/entertainment", {
      posts: results
  });
  } catch (err) {
    console.error(err);
  }
};

exports.getExtra = async (req, res) => {
  try {
    const lifeData = await Post.find({category: "Life"}).sort({createdAt: -1}).limit(18);
    const storiesData = await Post.find({category: "Stories"}).sort({createdAt: -1}).limit(6);
    res.render("blog/extra", {
      lifePosts: lifeData,
      storiesPosts: storiesData
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    const requestedPostId = req.params.postId;
    const result = await Post.findOne({_id: requestedPostId});
    if (!result) throw new Error("Cannot find any post with this id!");
    const relatedResults = await Post.find({category: result.category}).limit(3);
    res.render("blog/post", {
      post: result,
      relatedPosts: relatedResults
    });
  } catch (err) {
    console.error(err);
  }
}

exports.postRelSearchs = (req, res) => {
  const term = req.body.term;
  Post.find({
    $text: { $search: term },
  })
    .then(results => {
      res.render("blog/search", {
        posts: results,
        yourSearch: term
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

exports.getDashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const tablePosts = await Post.find({}).sort({createdAt: -1});
      const feedbacks = await feedbackModel.Feedback.find({}).sort({createdAt: -1});
      res.render("admin/dashboard", {
        posts: tablePosts,
        feedbacks: feedbacks
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
  }
};

exports.postDashboard = (req, res) => {
    const title = req.body.postTitle;
    const category = req.body.postCategorie;
    const image = req.file;
    const tag1 = req.body.tagOne;
    const tag2 = req.body.tagTwo;
    const tag3 = req.body.tagThree;
    const tag4 = req.body.tagFour;
    const content = req.body.postContent; 
    const imageUrl = image.path;
    const post = new Post({
        title: title,
        category: category,
        image: imageUrl,
        tagOne: tag1,
        tagTwo: tag2,
        tagThree: tag3,
        tagFour: tag4,
        content: content
    });
    post.save(err => {
        if (!err) {
            res.render("topics/success", {
              success: "Post Saved Successfully",
              successMessage: "The post is saved in the database without any errors",
              successButton: "Return to dashboard",
              path: "/dashboard"
            })
        } else {
          res.render("topics/failure", {
            error: "An error occured while saving the post!",
            errorMessage: "The post isn't saved in the database due to unexpected error!",
            path: "/dashboard"
          })
        }
    });
};

exports.postEditPost = (req, res) => {
  const postId = req.body.postId;
  Post.findOne({_id: postId}, (err, result) => {
    if (!result) {
      console.log(err);
      res.render("topics/failure", {
        error: "Cant't go to the edit page!",
        errorMessage: "The post you are looking to edit isn't found in the database, please try again.",
        path:"/dashboard"
      });
    } else {
      res.render("admin/edit", {
        post: result
      });
    }
  });

}

exports.postSavePost = (req, res) => {
  const postId = req.body.postId;
  const updatedTitle = req.body.postTitle;
  const updatedCategory = req.body.postCategorie;
  const updatedTag1 = req.body.tagOne;
  const updatedTag2 = req.body.tagTwo;
  const updatedTag3 = req.body.tagThree;
  const updatedTag4 = req.body.tagFour;
  const updatedContent = req.body.postContent;
  Post.findOne({_id: postId}, (err, post) => {
    if (!err) {
      post.title = updatedTitle;
      post.category = updatedCategory;
      post.tagOne = updatedTag1;
      post.tagTwo = updatedTag2;
      post.tagThree = updatedTag3;
      post.tagFour = updatedTag4;
      post.content = updatedContent;
      post.save(err => {
        if (!err) {
          res.render("topics/success", {
            success: "Post Updated Successfully",
            successMessage: "The post is updated without any errors",
            successButton: "Return to dashboard",
            path: "/dashboard"
          })
        } else {
          res.render("topics/failure", {
            error: "Cant't Update the post!",
            errorMessage: "The post isn't updated due to unexpected error, please try again.",
            path:"/dashboard"
          })
        }
      });
    }
  });
}

exports.postDelPost = (req, res) => {
  const postId = req.body.postId;
  Post.deleteOne({_id: postId}, err => {
    if(!err) {
      res.render("topics/success", {
        success: "Post deleted Successfully",
        successMessage: "The Post is deleted from the database without any errors",
        successButton: "Return to dashboard",
        path: "/dashboard"
      });
    } else {
      console.log(err);
      res.render("topics/failure", {
        error: "Cant't delete the post!",
        errorMessage: "The post isn't deleted due to unexpected error!",
        path:"/dashboard"
      })
    }
  })
}

exports.postDelFeedback = (req, res) => {
  const feedbackId = req.body.feedbackId;
  feedbackModel.Feedback.deleteOne({_id: feedbackId}, err => {
    if(!err) {
      res.render("topics/success", {
        success: "Feedback deleted Successfully",
        successMessage: "The feedback is deleted from the database without any errors",
        successButton: "Return to dashboard",
        path: "/dashboard#feedbacks"
      });
    } else {
      console.log(err);
      res.render("topics/failure", {
        error: "Cant't delete the feedback!",
        errorMessage: "The feedback isn't deleted due to unexpected error!",
        path:"/dashboard#feedbacks"
      })
    }
  })
}

exports.getLogOut = (req, res) => {
    req.logout();
    res.redirect("/login");
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
          });
      }
    })
};