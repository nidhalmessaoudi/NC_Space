import Request from "../router/Request";
import Api from "../apis/articles/Article";
import ArticlePreviewComponent from "../components/ArticlePreview/ArticlePreview.component";

export const getHome = async (_: Request) => {
  await Api.getHottestArticles();
  const articles = Api.articles;
  articles.forEach((article, i) => {
    const Component = new ArticlePreviewComponent(article.title!, article.id!);
    if (i === 0) Component.render("beforeend", true);
    else Component.render("beforeend");
  });
};

export const getNotFound = (_: Request) => {};
