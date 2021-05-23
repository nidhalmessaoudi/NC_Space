import config from "./utils/config";
import markup from "./markup";
import route from "./routes/main";
import navigate from "./router/navigate";

// This piece of code will be removed when we start developing our components (testing purposes)
config.ROOT.insertAdjacentHTML("beforebegin", markup.style);

window.addEventListener("load", route);
window.addEventListener("popstate", route);

navigate.observe(config.ROOT, { childList: true });
