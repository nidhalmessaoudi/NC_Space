import { parse } from "query-string";

import Request from "./Request";
import Response from "./Response";

const req: Request = {
  protocol: location.protocol,
  href: location.href,
  origin: location.origin,
  port: location.port || null,
  path: location.pathname || null,
  hash: location.hash || null,
  queries: parse(location.search) || null,
  locale: navigator.language,
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  params: {},
};

const res: Response = {
  root: document.getElementById("root")!,

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
  private path = location.pathname;

  route(path: string, callback: Function) {
    this.path = location.pathname;
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
    callback(req, res);
  }

  pushState(pathName: string) {
    history.pushState({}, pathName, `${location.origin}${pathName}`);
  }
}

export default new Router();
