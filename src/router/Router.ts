import { parse } from "query-string";

import Request from "./Request";

class Router {
  private path: string = "";
  private routes: string[] = [];

  route(path: string, callback: Function) {
    this.path = location.pathname;
    const req = this.buildRequest();
    if (path.startsWith("*")) {
      const isFound = this.routes.includes(this.path);
      if (!isFound) {
        callback(req);
        return;
      }
    }

    const fullPath = this.extractParams(path, req) || path;

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

    callback(req);
  }

  pushToHistory(pathName: string) {
    history.pushState({}, pathName, `${location.origin}${pathName}`);
  }

  private extractParams(path: string, req: Request) {
    if (path.includes(":")) {
      const parentCurrPath = this.path.slice(0, this.path.lastIndexOf("/") + 1);
      const [parentPath, param] = path.split(":");

      if (parentCurrPath !== parentPath) return;
      const paramValue = this.path.split(parentPath)[1];
      const fullPath = `${parentPath}${paramValue}`;
      req.params[param] = paramValue;
      return fullPath;
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
