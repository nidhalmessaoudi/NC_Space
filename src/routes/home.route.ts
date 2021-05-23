import Router from "../router/Router";
import * as homeController from "../controllers/home.contoller";

export default () => {
  Router.route("/", homeController.getHome);
  Router.route("*", homeController.getNotFound);
};
