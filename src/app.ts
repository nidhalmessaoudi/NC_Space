import config from "./utils/config";
import markup from "./markup";
import AppRoute from "./routes/App.route";

class App {
  constructor() {
    // This piece of code will be removed when we start developing our components (testing purposes)
    config.ROOT.insertAdjacentHTML("beforebegin", markup.style);
    new AppRoute();
  }
}
new App();
