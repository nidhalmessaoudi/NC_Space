import Request from "../router/Request";
import ArticleApi from "../apis/Article";
import UserApi from "../apis/User";
import ArticleComponent from "../components/Article/Article.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import catchError from "../helpers/catchError";
import LikeComponent from "../components/Like/Like.component";
import LikesCntComponent from "../components/LikesContainer/LikesContainer.component";
import CommentComponent from "../components/Comment/Comment.component";
import CommentsCntComponent from "../components/CommentsContainer/CommentsContainer.component";
import SuccessComponent from "../components/Success/Success.component";

export const getArticles = (_: Request) => {};

// The logic here will be splitted into multiple functions later!
export const getArticle = async (req: Request) => {
  const Spinner = new SpinnerComponent();

  // Get Article
  Spinner.render("afterbegin", true);
  await ArticleApi.getBySlug(req.params?.slug!);

  if (catchError(ArticleApi)) return;
  const article = ArticleApi.article!;

  let likeAction = "Give A Like";

  // Check if it's bookmarked for the current logged in user
  await UserApi.getCurrentUser();

  // Get likes for this article
  await ArticleApi.getLikes(article.id!);

  Spinner.remove();

  if (UserApi.user) {
    article.bookmarked = false;
    UserApi.user.bookmarks?.forEach((bookmark) => {
      if (bookmark.article.id === article.id) article.bookmarked = true;
    });

    ArticleApi.likes?.forEach((like) => {
      if (like.user.id === UserApi.user?.id) likeAction = "Liked";
    });
  }

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
    article.numberOfComments!,
    likeAction,
    article.bookmarked!
  );
  Article.render("beforeend", true);

  // Bookmark handler
  const bookmarkBtn = document.getElementById("bookmark-btn");
  bookmarkBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentState = Article.state;
    Article.state = { bookmarkAction: "Loading" };
    await ArticleApi.toggleBookmark(article.id!);

    if (catchError(ArticleApi)) {
      Article.state = { bookmarkAction: currentState.bookmarkAction };
      return;
    }

    if (ArticleApi.bookmark) Article.state = { bookmarkAction: "Bookmarked" };
    else Article.state = { bookmarkAction: "Bookmark" };
  });

  // Render comments
  const CommentsContainer = new CommentsCntComponent("Add Comment");
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

    CommentsContainer.state = { commentAction: "Loading" };
    await ArticleApi.createComment(article.id!, commentInput.value);
    commentInput.value = "";
    CommentsContainer.state = { commentAction: "Add Comment" };
    if (catchError(ArticleApi)) return;

    if (ArticleApi.message) {
      const CommentSuccess = new SuccessComponent(ArticleApi.message);
      CommentSuccess.root = CommentsContainer.element!;
      CommentSuccess.render("afterbegin");
      CommentSuccess.removeAfter(8);
      return;
    }
    Article.state = { numberOfComments: Article.state.numberOfComments! + 1 };
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
      Article.state = { likeAction: "Loading" };
      await ArticleApi.toggleLike(article.id!);
      if (catchError(ArticleApi)) {
        Article.state = { likeAction: "Give A Like" };
        return;
      }

      if (ArticleApi.like)
        Article.state = {
          numberOfLikes: Article.state.numberOfLikes! + 1,
          likeAction: "Liked",
        };
      else
        Article.state = {
          numberOfLikes: Article.state.numberOfLikes! - 1,
          likeAction: "Give A Like",
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
