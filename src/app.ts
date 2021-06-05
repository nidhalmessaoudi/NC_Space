import config from "./utils/config";
import route from "./routes/App.route";
import navigate from "./router/navigate";

(function init() {
  window.addEventListener("load", route);
  window.addEventListener("popstate", route);
  navigate.observe(config.ROOT, { childList: true });
})();
