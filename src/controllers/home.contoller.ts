import Request from "../router/Request";
import Api from "../apis/articles/Article";
import ArticlePreviewComponent from "../components/ArticlePreview/ArticlePreview.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import User from "../apis/users/User";
import NavbarComponent from "../components/Navbar/Navbar.component";
import NotFoundComponent from "../components/NotFound/NotFound.component";

export const getHome = async (_: Request) => {
  await User.getCurrentUser();
  let Navbar;
  if (User.user)
    Navbar = new NavbarComponent(
      true,
      `/${User.user.username}`,
      User.user.name
    );
  else Navbar = new NavbarComponent(false, "/login");
  Navbar.render("afterbegin", true);

  const Spinner = new SpinnerComponent();
  Spinner.render();
  await Api.getHottestArticles();
  const articles = Api.articles;
  articles.forEach((article) => {
    const Component = new ArticlePreviewComponent(article.title!, article.id!);
    Component.render("beforeend");
  });
};

export const getNotFound = (_: Request) => {
  const NotFound = new NotFoundComponent();
  NotFound.render("afterbegin", true);
};
