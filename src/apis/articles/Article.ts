import AJAX from "../../utils/AJAX";
import Api from "../Api";
import ArticleModel from "../../models/Article.model";
import LikeModel from "../../models/Like.model";
import CommentModel from "../../models/Comment.model";

class Article extends Api {
  private _articles!: ArticleModel[];
  private _article!: ArticleModel;
  private _likes!: LikeModel[];
  private _like!: LikeModel;
  private _comments!: CommentModel[];
  private _comment!: CommentModel;
  private _stats!: any;

  get articles() {
    if (!this._articles)
      throw new Error(
        "You must call one of the fetching methods before accessing the articles!"
      );
    return this._articles;
  }

  get article() {
    if (!this._article)
      throw new Error(
        "You must call the getArticle() method before accessing the article!"
      );
    return this._article;
  }

  get likes() {
    if (!this._likes)
      throw new Error(
        "You must call the getArticleLikes() method before accessing the likes!"
      );
    return this._likes;
  }

  get like() {
    if (!this._like)
      throw new Error(
        "You must call the toggleArticleLike() method before accessing the like!"
      );
    return this._like;
  }

  get comments() {
    if (!this._comments)
      throw new Error(
        "You must call the getArticleComments() method before accessing the comments!"
      );
    return this._comments;
  }

  get comment() {
    if (!this._comment)
      throw new Error(
        "You must call the createArticleComment() method before accessing the comment!"
      );
    return this._comment;
  }

  get stats() {
    if (!this._stats)
      throw new Error(
        "You must call the getStats() method before accessing the stats!"
      );
    return this._stats;
  }

  async getArticles<T extends object>(queries?: T) {
    let Articles: AJAX;
    if (queries) Articles = new AJAX("articles", "GET", queries);
    else Articles = Articles = new AJAX("articles", "GET");
    await Articles.recieve();
    if (this.checkForErrors(Articles)) return;
    this._articles = Articles.data.articles;
  }

  async getArticle(id: string) {
    const Article = new AJAX(`articles/${id}`, "GET");
    await Article.recieve();
    if (this.checkForErrors(Article)) return;
    this._article = Article.data.article;
  }

  async createArticle(data: ArticleModel) {
    const NewArticle = new AJAX(`articles`, "POST", undefined, data);
    await NewArticle.recieve();
    if (this.checkForErrors(NewArticle)) return;
    this._article = NewArticle.data.article;
  }

  async updateArticle(id: string, data: ArticleModel) {
    const UpdatedArticle = new AJAX(`articles/${id}`, "PATCH", undefined, data);
    await UpdatedArticle.recieve();
    if (this.checkForErrors(UpdatedArticle)) return;
    this._article = UpdatedArticle.data.article;
  }

  async deleteArticle(id: string) {
    const DeletedArticle = new AJAX(`articles/${id}`, "DELETE");
    await DeletedArticle.recieve();
    if (this.checkForErrors(DeletedArticle)) return;
  }

  async searchArticles(queryStr: string) {
    const foundArticles = new AJAX(`articles/search`, "GET", { q: queryStr });
    await foundArticles.recieve();
    if (this.checkForErrors(foundArticles)) return;
    this._articles = foundArticles.data.articles;
  }

  async getHottestArticles<T extends object>(queries?: T) {
    let Articles: AJAX;
    if (queries) Articles = new AJAX("articles/hottest", "GET", queries);
    else Articles = Articles = new AJAX("articles/hottest", "GET");
    await Articles.recieve();
    if (this.checkForErrors(Articles)) return;
    this._articles = Articles.data.hottestArticles;
  }

  async getStats(queryStr?: string) {
    const Stats = new AJAX(`articles/stats`, "GET", { by: queryStr });
    await Stats.recieve();
    if (this.checkForErrors(Stats)) return;
    this._stats = Stats.data.articles;
  }
  async getMonthlyStats(year: string) {
    const Stats = new AJAX(`articles/monthly-stats/${year}`, "GET");
    await Stats.recieve();
    if (this.checkForErrors(Stats)) return;
    this._stats = Stats.data.articles;
  }

  async getArticleLikes(id: string) {
    const Likes = new AJAX(`articles/${id}/likes`, "GET");
    await Likes.recieve();
    if (this.checkForErrors(Likes)) return;
    this._likes = Likes.data.likes;
  }

  async toggleArticleLike(id: string) {
    const Like = new AJAX(`articles/${id}/likes`, "POST");
    await Like.recieve();
    if (this.checkForErrors(Like)) return;
    this._like = Like.data.like;
  }

  async getArticleComments(id: string) {
    const Comments = new AJAX(`articles/${id}/comments`, "GET");
    await Comments.recieve();
    if (this.checkForErrors(Comments)) return;
    this._comments = Comments.data.comments;
  }

  async CreateArticleComment(id: string) {
    const Comment = new AJAX(`articles/${id}/comments`, "POST");
    await Comment.recieve();
    if (this.checkForErrors(Comment)) return;
    this._comment = Comment.data.comment;
  }
}

export default new Article();
