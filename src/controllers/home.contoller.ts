import Request from "../router/Request";
import Api from "../apis/articles/Article";
import ArticlePreviewComponent from "../components/ArticlePreview/ArticlePreview.component";
import Spinner from "../components/LoadingSpinner/spinner.component";

export const getHome = async (_: Request) => {
  new Spinner();
  await Api.getHottestArticles();
  const articles = Api.articles;
  articles.forEach((article, i) => {
    const Component = new ArticlePreviewComponent(article.title!, article.id!);
    Component.render("beforeend", i === 0 ? true : false);
  });
};

export const getNotFound = (_: Request) => {};
