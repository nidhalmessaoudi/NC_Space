import Router from "../router/Router";
import * as articleController from "../controllers/article.controller";

export default () => {
  Router.route("/articles", articleController.getArticles);

  Router.route("/articles/:slug", articleController.getArticle);

  Router.route("/create", articleController.createArticle);
};
