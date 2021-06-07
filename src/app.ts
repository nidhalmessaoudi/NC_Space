import config from "./utils/config";
import route from "./routes/App.route";
import Navigate from "./router/Navigate";

(function init() {
  window.addEventListener("load", route);
  window.addEventListener("popstate", route);
  Navigate.observe(config.ROOT, { childList: true });
})();
