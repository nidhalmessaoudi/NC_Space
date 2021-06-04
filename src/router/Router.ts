import { parse } from "query-string";

import config from "../utils/config";
import Request from "./Request";
import Response from "./Response";

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

  setTitle(title: string) {
    document.title = title;
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
    const req = this.buildRequest();
    if (path.startsWith("*")) {
      const isFound = this.routes.includes(this.path);
      if (!isFound) {
        callback(req, res);
        return;
      }
    }

    let fullPath: string = path;

    const extractedParams = this.extractParams(path);
    if (extractedParams?.fullPath) fullPath = extractedParams.fullPath;
    if (extractedParams?.id) req.params.id = extractedParams.id;
    if (extractedParams?.slug) req.params.slug = extractedParams.slug;

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

  pushToHistory(pathName: string) {
    history.pushState({}, pathName, `${location.origin}${pathName}`);
  }

  private extractParams(path: string) {
    if (path.includes(":")) {
      const parentCurrPath = this.path.slice(0, this.path.lastIndexOf("/") + 1);
      const [parentPath, param] = path.split(":");

      if (parentCurrPath !== parentPath) return;
      const paramValue = this.path.split(parentPath)[1];
      const fullPath = `${parentPath}${paramValue}`;
      if (param === "id") return { fullPath, id: paramValue };
      if (param === "slug") return { fullPath, slug: paramValue };
    }
  }

  private buildRequest(): Request {
    return {
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
  }
}

export default new Router();
