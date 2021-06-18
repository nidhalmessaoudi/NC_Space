import Request from "../router/Request";
import ArticleApi from "../apis/Article";
import ArticlePreviewComponent from "../components/ArticlePreview/ArticlePreview.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import User from "../apis/User";
import NavbarComponent from "../components/Navbar/Navbar.component";
import NotFoundComponent from "../components/NotFound/NotFound.component";
import catchError from "../helpers/catchError";

export const getHome = async (_: Request) => {
  const Spinner = new SpinnerComponent();
  Spinner.render("afterbegin", true);
  User.clearDocs();
  await User.getCurrentUser();
  let Navbar;
  if (User.user)
    Navbar = new NavbarComponent(User.user.name!, User.user.username!);
  else Navbar = new NavbarComponent("Login");
  Navbar.render("afterbegin", true);
  Spinner.render();
  await ArticleApi.getHottest();
  Spinner.remove();
  if (catchError(ArticleApi)) return;

  const articles = ArticleApi.articles!;
  articles.forEach((article) => {
    const Component = new ArticlePreviewComponent(
      article.title!,
      article.slug!
    );
    Component.render("beforeend");
  });
};

export const getNotFound = (_: Request) => {
  const NotFound = new NotFoundComponent();
  NotFound.render("afterbegin", true);
};
