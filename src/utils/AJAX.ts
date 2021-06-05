import { stringify } from "query-string";

import config from "./config";

class AJAX {
  private baseUrl = config.MAIN_API!;
  private _data: any;
  private _error!: string;

  get data() {
    return this._data;
  }

  get error() {
    return this._error;
  }

  constructor(
    private path: string,
    private method: string,
    private params?: object,
    private body?: object,
    private headers?: HeadersInit
  ) {}

  async recieve() {
    try {
      const queries = this.params ? stringify(this.params) : undefined;

      const completeUrl = queries
        ? `${this.baseUrl}${this.path}?${this.params}`
        : `${this.baseUrl}${this.path}`;

      const headers = new Headers(this.headers);
      headers.append("Content-Type", "application/json");

      const request = await fetch(completeUrl, {
        method: this.method,
        mode: "cors",
        cache: "default",
        credentials: "include",
        headers: headers,
        redirect: "manual",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(this.body),
      });
      const response = await request.json();
      this._data = response.data;
      return await response;
    } catch (err) {
      this._error = err.message;
    }
  }
}

// interface AJAXResponse {
//   readonly status: "success" | "fail" | "error";
//   readonly message?: string;
//   readonly data?: object[];
// }

export default AJAX;
