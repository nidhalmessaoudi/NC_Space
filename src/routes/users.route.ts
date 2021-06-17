import Router from "../router/Router";
import * as authController from "../controllers/auth.contoller";
import * as userController from "../controllers/user.controller";

export default () => {
  Router.route("/signup", authController.signup);
  Router.route("/login", authController.login);

  Router.route("/users/:username", userController.getPublicUser);
};
