import Router from "./router/Router";
import Request from "./router/Request";
import Response from "./router/Response";
import AJAX from "./utils/AJAX";
import markup from "./markup";

/*
@Note:
=> Of course all of this logic and handlers inside tha app.ts file will be moved soon 
into its controllers.
=> We are just on the first steps of development and we are making some api testing.
=> When we start structuring the project, of course we will add descriptions 
to the important modules, classes, interfaces and functions to make evthg clear!
*/

const root = document.getElementById("root")!;

root.insertAdjacentHTML("beforebegin", markup.style);

const dealWithForms = (logic: Function) => {
  const form = document.getElementsByTagName("form")[0];
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      logic(form);
    });
  }
};

const route = () => {
  Router.route("/", async (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/"], "beforeend", true);
  });

  Router.route("/articles", (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/articles"], "beforeend", true);
    const printArticles = (form: HTMLFormElement) => {
      if (form.classList.contains("get_all-form")) {
        (async () => {
          try {
            const Articles = new AJAX("articles", "GET");
            await Articles.recieve();
            const articles = Articles.data;

            console.log(articles);
          } catch (err) {
            console.error(err);
          }
        })();
      }
    };
    dealWithForms(printArticles);
  });

  Router.route("/articles/:slug", (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/article"], "beforeend");
    const printArticle = (form: HTMLFormElement) => {
      if (form.classList.contains("get_one-form")) {
        (async () => {
          try {
            const Article = new AJAX(`articles/${req.params.slug}`, "GET");
            await Article.recieve();
            const article = Article.data;

            console.log(article);
          } catch (err) {
            console.error(err);
          }
        })();
      }
    };
    dealWithForms(printArticle);
  });

  Router.route("/login", (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/login"], "beforeend", true);
    const loginUser = (form: HTMLFormElement) => {
      if (form.classList.contains("login-form")) {
        (async () => {
          try {
            const emailInput = form.querySelector(".email") as HTMLInputElement;
            const passInput = form.querySelector(
              ".password"
            ) as HTMLInputElement;
            const userCredentials = {
              email: emailInput.value,
              password: passInput.value,
            };
            const User = new AJAX(
              "users/login",
              "POST",
              undefined,
              userCredentials
            );
            await User.recieve();
            const loggedUser = User.data;

            console.log(loggedUser);
          } catch (err) {
            console.error(err);
          }
        })();
      }
    };
    dealWithForms(loginUser);
  });

  Router.route("/create", (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/create"], "beforeend", true);
    const createArticle = (form: HTMLFormElement) => {
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
            const Article = new AJAX("articles", "POST", undefined, newArticle);
            await Article.recieve();
            const savedArticle = Article.data;

            console.log(savedArticle);
          } catch (err) {
            console.error(err);
          }
        })();
      }
    };
    dealWithForms(createArticle);
  });
};

window.addEventListener("load", route);
window.addEventListener("popstate", route);

// const clean = () => {
//   root.innerHTML = "";
// };

// const init = () => {
//   clean();
//   root.insertAdjacentHTML(
//     "beforeend",
//     markup[location.pathname]
//       ? markup[location.pathname]
//       : markup.notFound
//   );
// };
// init();

// const linkClickHandler = (pathName: string = "") => {
//   clean();
//   history.pushState({}, pathName, location.origin + pathName);
//   root.insertAdjacentHTML("beforeend", markup[pathName]);
// };

// root.addEventListener("click", (e) => {
//   e.preventDefault();
//   const tag = e.target as HTMLAnchorElement;
//   console.log(tag.localName);
//   if (tag.classList.contains("articles")) linkClickHandler(tag.pathname);
//   if (tag.classList.contains("login")) linkClickHandler(tag.pathname);
//   if (tag.classList.contains("create")) linkClickHandler(tag.pathname);
// });

// window.addEventListener("popstate", () => {
//   init();
// });

// root.addEventListener("click", (e) => {
//   e.preventDefault();
//   const clicked = e.target as HTMLAnchorElement;
//   if (clicked?.tagName !== "A") return;
//   Router.pushState(clicked.pathname);
//   route();
// });
