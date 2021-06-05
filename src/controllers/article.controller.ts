import Request from "../router/Request";
import Api from "../apis/articles/Article";
import ArticleComponent from "../components/Article/Article.component";

export const getArticles = (_: Request) => {};

export const getArticle = async (req: Request) => {
  await Api.getArticle(req.params.slug!);
  const article = Api.article;
  const Component = new ArticleComponent(
    article.title!,
    article.slug!,
    article.category!,
    article.createdAt!,
    article.views!,
    article.coverImage!,
    article.summary!,
    article.body!,
    article.tags!
  );
  Component.render("beforeend", true);
};

export const createArticle = (_: Request) => {};
