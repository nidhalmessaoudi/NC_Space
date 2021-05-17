import { stringify } from "query-string";

const root = document.getElementById("root")!;

// IIFE for init
(() => {
  const initMarkup = `
  <style>
    #root {
      display: flex;
      justify-content: center;
    }
    form, input, button {
      display: block;
      margin: 5px;
    }
  </style>
  <form class="get_all-form">
    <button type:"submit">Get All Articles</button>
  </form>
  <form class="login-form">
    <label>Email</label>
    <input type="text" class="email">
    <label>password</label>
    <input type="password" class="password">
    <button type="submit">Login</button>
  </form>
  <form class="create-form">
    <label>Name</label>
    <input type="text" class="article-name">
    <label>Category</label>
    <input type="text" class="article-category">
    <label>Reading time</label>
    <input type="number" class="article-reading-time">
    <label>Number of paragraphs</label>
    <input type="number" class="article-paragraphs">
    <label>Cover image url</label>
    <input type="text" class="article-cover-image">
    <label>Body</label>
    <textarea class="article-body" id="" cols="30" rows="10"></textarea> 
    <button type="submit">Create Article</button>
  </form>`;
  root.insertAdjacentHTML("beforeend", initMarkup);
})();

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

root.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  if (form.classList.contains("get_all-form")) {
    (async () => {
      try {
        const Articles = new Request("articles", "GET");

        const articles = await Articles.getData();

        console.log(articles);
      } catch (err) {
        console.error(err);
      }
    })();
  }
  if (form.classList.contains("login-form")) {
    (async () => {
      try {
        const emailInput = form.querySelector(".email") as HTMLInputElement;
        const passInput = form.querySelector(".password") as HTMLInputElement;
        const userCredentials = {
          email: emailInput.value,
          password: passInput.value,
        };
        const User = new Request(
          "users/login",
          "POST",
          undefined,
          userCredentials
        );

        const loggedUser = await User.getData();

        console.log(loggedUser);
      } catch (err) {
        console.error(err);
      }
    })();
  }
  if (form.classList.contains("create-form")) {
    (async () => {
      try {
        const nameInput = form.querySelector(
          ".article-name"
        ) as HTMLInputElement;

        const categoryInput = form.querySelector(
          ".article-category"
        ) as HTMLInputElement;

        const ReadTimeInput = form.querySelector(
          ".article-reading-time"
        ) as HTMLInputElement;

        const imageUrlInput = form.querySelector(
          ".article-cover-image"
        ) as HTMLInputElement;

        const paragraphsInput = form.querySelector(
          ".article-paragraphs"
        ) as HTMLInputElement;

        const bodyInput = form.querySelector(
          ".article-body"
        ) as HTMLTextAreaElement;

        const newArticle = {
          name: nameInput.value,
          category: categoryInput.value,
          readingTime: ReadTimeInput.value,
          coverImage: imageUrlInput.value,
          paragraphs: paragraphsInput.value,
          body: bodyInput.value,
        };
        const Article = new Request("articles", "POST", undefined, newArticle);

        const savedArticle = await Article.getData();

        console.log(savedArticle);
      } catch (err) {
        console.error(err);
      }
    })();
  }
});
