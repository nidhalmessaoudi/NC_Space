import Request from "../router/Request";
import Api from "../apis/articles/Article";
import ArticleComponent from "../components/Article/Article.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";

export const getArticles = (_: Request) => {};

export const getArticle = async (req: Request) => {
  const Spinner = new SpinnerComponent();
  Spinner.render();
  await Api.getArticle(req.params.slug!);
  const article = Api.article;
  const Article = new ArticleComponent(
    article.title!,
    article.slug!,
    article.category!,
    article.createdAt!,
    article.views!,
    article.coverImage!,
    article.summary!,
    article.body!,
    article.tags!,
    article.numberOfLikes!,
    article.numberOfComments!
  );
  Article.render("beforeend", true);
};

export const createArticle = (_: Request) => {};
