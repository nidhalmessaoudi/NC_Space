import View from "./View";
import Request from "./Request";
import viewsMarkup from "./viewsMarkup";

const root = document.getElementById("root") as HTMLDivElement;

const Home = new View(root, "/", viewsMarkup.home);
const Articles = new View(root, "/articles", viewsMarkup.articles);
const Login = new View(root, "/login", viewsMarkup.login);
const CreateArticle = new View(root, "/create", viewsMarkup.createNewArticle);

Home.render("beforebegin", viewsMarkup.style);

root.addEventListener("click", (e) => {
  e.preventDefault();

  const tag = e.target as HTMLAnchorElement;
  if (tag.classList.contains("articles")) Articles.goTolink();
  if (tag.classList.contains("login")) Login.goTolink();
  if (tag.classList.contains("create")) CreateArticle.goTolink();
});

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
