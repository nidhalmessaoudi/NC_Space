import Request from "../router/Request";
import ArticleApi from "../apis/Article";
import ArticleComponent from "../components/Article/Article.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import catchError from "../helpers/catchError";
import LikeComponent from "../components/Like/Like.component";
import LikesCntComponent from "../components/LikesContainer/LikesContainer.component";
import CommentComponent from "../components/Comment/Comment.component";
import CommentsCntComponent from "../components/CommentsContainer/CommentsContainer.component";
import SuccessComponent from "../components/Success/Success.component";

export const getArticles = (_: Request) => {};

export const getArticle = async (req: Request) => {
  const Spinner = new SpinnerComponent();
  Spinner.render("afterbegin", true);
  await ArticleApi.getBySlug(req.params?.slug!);
  Spinner.remove();

  if (catchError(ArticleApi)) return;

  const article = ArticleApi.article!;
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

  // Render comments
  const CommentsContainer = new CommentsCntComponent();
  CommentsContainer.render();
  Spinner.render();
  await ArticleApi.getComments(article.id!);
  Spinner.remove();

  if (catchError(ArticleApi)) return;

  const comments = ArticleApi.comments;
  comments?.forEach((comment) => {
    const Comment = new CommentComponent(
      comment.author.username!,
      comment.author.name!,
      comment.comment
    );
    Comment.root = CommentsContainer.element!;
    Comment.render();
  });

  // Add comment
  const commentForm = document.getElementById(
    "comment-form"
  ) as HTMLFormElement;
  const commentInput = document.getElementById(
    "comment-input"
  ) as HTMLTextAreaElement;

  commentForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const CommentSpinner = new SpinnerComponent();
    CommentSpinner.root = CommentsContainer.element!;
    CommentSpinner.render("afterbegin");
    await ArticleApi.createComment(article.id!, commentInput.value);
    CommentSpinner.remove();

    if (catchError(ArticleApi)) return;

    if (ArticleApi.message) {
      const CommentSuccess = new SuccessComponent(ArticleApi.message);
      CommentSuccess.root = CommentsContainer.element!;
      CommentSuccess.render("afterbegin");
      CommentSuccess.removeAfter(8);
      return;
    }

    const newComment = new CommentComponent(
      ArticleApi.comment?.author.username!,
      ArticleApi.comment?.author.name!,
      ArticleApi.comment?.comment!
    );
    newComment.root = CommentsContainer.element!;
    newComment.render();
  });

  // Render an empty container for likes
  const LikesContainer = new LikesCntComponent();
  LikesContainer.render();

  // User reaction state
  let userReact = false;

  const userReaction = document.getElementById("user-reaction");
  userReaction?.addEventListener("click", async (e) => {
    const clicked = e.target as HTMLElement;

    // Give new like functionality
    if (clicked.id === "like-btn") {
      userReact = true;
      Spinner.render();
      await ArticleApi.toggleLike(article.id!);
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
    }

    // Display who gives like to the article
    if (clicked.classList.contains("article-likes")) {
      const likesCntEl = document.getElementById(LikesContainer.id)!;
      if (likesCntEl.dataset.state === "visible") {
        likesCntEl.style.display = "none";
        likesCntEl.dataset.state = "invisible";
        LikesContainer.clear();
        return;
      }

      let likes = ArticleApi.likes;
      if (userReact || !likes) {
        Spinner.render();
        await ArticleApi.getLikes(article.id!);
        Spinner.remove();
        likes = ArticleApi.likes;
      }

      if (catchError(ArticleApi)) return;

      likes?.forEach((like) => {
        const { user } = like;
        const Like = new LikeComponent(user.username!, user.name!);
        Like.root = document.getElementById(LikesContainer.id)!;
        Like.render("beforeend");
      });
      likesCntEl.style.display = "block";
      likesCntEl.dataset.state = "visible";
      userReact = false;
    }
  });
};

export const createArticle = (_: Request) => {};
