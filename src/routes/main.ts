import routeArticles from "./articles.route";
import routeUsers from "./users.route";
import routeHome from "./home.route";

export default () => {
  routeArticles();
  routeUsers();
  routeHome();
};
