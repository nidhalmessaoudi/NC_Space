import { stringify } from "query-string";

class Request {
  private baseUrl: string = process.env.NC_SPACE_API!;
  private data: object | undefined;

  constructor(
    private path: string,
    private method: string,
    private params?: object,
    private body?: object,
    private headers?: HeadersInit
  ) {}

  async sendRequest(): Promise<object> {
    const queries = this.params ? stringify(this.params) : undefined;

    const completeUrl = queries
      ? `${this.baseUrl}${this.path}?${this.params}`
      : `${this.baseUrl}${this.path}`;

    const headers = new Headers(this.headers);
    headers.append("Content-Type", "application/json");

    const response = await fetch(completeUrl, {
      method: this.method,
      mode: "cors",
      cache: "default",
      credentials: "include",
      headers: headers,
      redirect: "manual",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(this.body),
    });

    return response.json();
  }

  async getData(): Promise<object> {
    this.data = await this.sendRequest();
    return this.data;
  }
}

export default Request;
