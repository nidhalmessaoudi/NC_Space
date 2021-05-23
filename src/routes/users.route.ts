import Router from "../router/Router";
import * as authController from "../controllers/auth.contoller";

export default () => {
  Router.route("/login", authController.login);
};
