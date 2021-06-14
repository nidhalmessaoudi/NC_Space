import Request from "../router/Request";
import ArticleApi from "../apis/articles/Article";
import ArticleComponent from "../components/Article/Article.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import catchError from "../helpers/catchError";

export const getArticles = (_: Request) => {};

export const getArticle = async (req: Request) => {
  const Spinner = new SpinnerComponent();
  Spinner.render();
  await ArticleApi.getArticle(req.params.id!);
  const article = ArticleApi.article;
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

  const userReaction = document.getElementById("user-reaction");
  userReaction?.addEventListener("click", async (e) => {
    const clicked = e.target as HTMLElement;
    const clickedId = clicked.id;
    if (clickedId !== "like-btn") return;
    Spinner.render();
    await ArticleApi.toggleArticleLike(article.id!);
    Spinner.remove();

    if (catchError(ArticleApi)) return;

    if (ArticleApi.like)
      Article.state = {
        numberOfLikes: Article.state.numberOfLikes! + 1,
      };
    else
      Article.state = {
        numberOfLikes: Article.state.numberOfLikes! - 1,
      };
  });
};

export const createArticle = (_: Request) => {};
