const express = require("express");

const router = express.Router();

const articleController = require("../controllers/articleController");

router.route("/")
    .get(articleController.getAllArticles)
    .post(articleController.createArticle);

router.route("/:id")
    .get(articleController.getArticle)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

router.route("/:category")
    .get(articleController.getArticlesByCategory);

module.exports = router;
