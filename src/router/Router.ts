import { parse } from "query-string";

import config from "../utils/config";
import Request from "./Request";
import Response from "./Response";

const req: Request = {
  protocol: "",
  href: "",
  origin: "",
  port: "",
  path: "",
  hash: "",
  queries: {},
  locale: "",
  userAgent: "",
  platform: "",
  params: {},
};

const res: Response = {
  root: config.ROOT,

  sendText(text: string, displayEl: keyof HTMLElementTagNameMap = "p") {
    const el = document.createElement(displayEl);
    el.innerText = text;
    this.root.appendChild(el);
  },

  insert(markup: string, position: InsertPosition, clean: boolean = false) {
    if (clean) this.clean();
    this.root.insertAdjacentHTML(position, markup);
  },

  async render(htmlFile: `${string}.html`, position: InsertPosition) {
    const file = await fetch(htmlFile);
    const markup = await file.text();
    this.root.insertAdjacentHTML(position, markup);
  },

  clean() {
    this.root.innerHTML = "";
  },
};

class Router {
  private path: string = "";
  private routes: string[] = [];

  route(path: string, callback: Function) {
    this.path = location.pathname;
    if (path.startsWith("*")) {
      const isFound = this.routes.includes(this.path);
      if (!isFound) {
        callback(req, res);
        return;
      }
    }
    let fullPath: string = path;
    if (path.includes(":")) {
      const parentCurrPath = this.path.slice(0, this.path.lastIndexOf("/") + 1);
      const [parentPath, param] = path.split(":");

      if (parentCurrPath !== parentPath) return;
      const paramValue = this.path.split(parentPath)[1];

      if (param === "id") req.params.id = paramValue;
      if (param === "slug") req.params.slug = paramValue;
      fullPath = `${parentPath}${paramValue}`;
    }
    if (fullPath !== this.path) return;
    this.routes.push(fullPath);

    req.protocol = location.protocol;
    req.href = location.href;
    req.origin = location.origin;
    req.port = location.port || null;
    req.path = location.pathname || null;
    req.hash = location.hash || null;
    req.queries = parse(location.search) || null;
    req.locale = navigator.language;
    req.userAgent = navigator.userAgent;
    req.platform = navigator.platform;

    callback(req, res);
  }

  pushState(pathName: string) {
    history.pushState({}, pathName, `${location.origin}${pathName}`);
  }
}

export default new Router();
