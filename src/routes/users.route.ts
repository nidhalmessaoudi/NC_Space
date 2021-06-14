import Router from "../router/Router";
import * as authController from "../controllers/auth.contoller";

export default () => {
  Router.route("/signup", authController.signup);
  Router.route("/login", authController.login);
};
