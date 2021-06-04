import config from "../utils/config";
import routeArticles from "./articles.route";
import routeUsers from "./users.route";
import routeHome from "./home.route";
import navigate from "../router/navigate";

export default class AppRoute {
  private routeHandlers = [routeArticles, routeUsers, routeHome];

  constructor() {
    window.addEventListener("load", this.handle.bind(this));
    window.addEventListener("popstate", this.handle.bind(this));

    navigate.observe(config.ROOT, { childList: true });
  }

  handle() {
    this.routeHandlers.forEach((handler) => handler());
  }
}
