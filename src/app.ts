import Router from "./router/Router";
import Request from "./router/Request";
import Response from "./router/Response";
// import AJAX from "../utils/Request";
import markup from "./markup";

const root = document.getElementById("root")!;

root.insertAdjacentHTML("beforebegin", markup.style);

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

const route = () => {
  Router.route("/", async (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/"], "beforeend", true);
  });

  Router.route("/articles", (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/articles"], "beforeend", true);
  });

  // Router.route("/articles/:slug", (req: Request, res: Response) => {
  //   console.log(req.href);
  //   res.insert(markup.articles, "beforeend");
  // });

  Router.route("/login", (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/login"], "beforeend", true);
  });

  Router.route("/create", (req: Request, res: Response) => {
    console.log(req.href);
    res.insert(markup["/create"], "beforeend", true);
  });
};
route();

// window.addEventListener("load", route);
window.addEventListener("popstate", route);

// const submitHandler = (e: Event) => submitHandler(e: Event) {
//   console.log(e);
//   const form = e.target as HTMLFormElement;
//   if (form.classList.contains("get_all-form")) {
//     (async () => {
//       try {
//         const Articles = new AJAX("articles", "GET");

//         const articles = await Articles.data;

//         console.log(articles);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }
//   if (form.classList.contains("login-form")) {
//     (async () => {
//       try {
//         const emailInput = form.querySelector(".email") as HTMLInputElement;
//         const passInput = form.querySelector(".password") as HTMLInputElement;
//         const userCredentials = {
//           email: emailInput.value,
//           password: passInput.value,
//         };
//         const User = new AJAX(
//           "users/login",
//           "POST",
//           undefined,
//           userCredentials
//         );

//         const loggedUser = await User.data;

//         console.log(loggedUser);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }
//   if (form.classList.contains("create-form")) {
//     (async () => {
//       try {
//         const nameInput = form.querySelector(
//           ".article-name"
//         ) as HTMLInputElement;

//         const categoryInput = form.querySelector(
//           ".article-category"
//         ) as HTMLInputElement;

//         const ReadTimeInput = form.querySelector(
//           ".article-reading-time"
//         ) as HTMLInputElement;

//         const imageUrlInput = form.querySelector(
//           ".article-cover-image"
//         ) as HTMLInputElement;

//         const paragraphsInput = form.querySelector(
//           ".article-paragraphs"
//         ) as HTMLInputElement;

//         const bodyInput = form.querySelector(
//           ".article-body"
//         ) as HTMLTextAreaElement;

//         const newArticle = {
//           name: nameInput.value,
//           category: categoryInput.value,
//           readingTime: ReadTimeInput.value,
//           coverImage: imageUrlInput.value,
//           paragraphs: paragraphsInput.value,
//           body: bodyInput.value,
//         };
//         const Article = new AJAX("articles", "POST", undefined, newArticle);

//         const savedArticle = await Article.data;

//         console.log(savedArticle);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }
// }

root.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target as HTMLAnchorElement;
  if (clicked?.tagName !== "A") return;
  Router.linkHandler(clicked.pathname);
  route();
});
