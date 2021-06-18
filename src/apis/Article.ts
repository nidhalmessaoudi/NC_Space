import AJAX from "../utils/AJAX";
import Api from "./Api";
import ArticleModel from "../models/Article.model";
import LikeModel from "../models/Like.model";
import CommentModel from "../models/Comment.model";

class Article extends Api<ArticleModel> {
  private _likes!: LikeModel[] | null;
  private _like!: LikeModel | null;
  private _comments!: CommentModel[] | null;
  private _comment!: CommentModel | null;
  private _stats!: any;

  constructor() {
    super();
    this.path = "articles";
  }

  get articles() {
    return this.docs;
  }

  get article() {
    return this.doc;
  }

  get likes() {
    return this._likes;
  }

  get like() {
    return this._like;
  }

  get comments() {
    return this._comments;
  }

  get comment() {
    return this._comment;
  }

  get stats() {
    return this._stats;
  }

  // async getArticles<T extends object>(queries?: T) {
  //   let Articles: AJAX;
  //   if (queries) Articles = new AJAX("articles", "GET", queries);
  //   else Articles = Articles = new AJAX("articles", "GET");
  //   await Articles.recieve();
  //   if (this.checkForErrors(Articles)) return;
  //   this._articles = Articles.data.articles;
  // }

  // async getArticle(id: string) {
  //   const Article = new AJAX(`articles/${id}`, "GET");
  //   await Article.recieve();
  //   if (this.checkForErrors(Article)) return;
  //   this._article = Article.data.article;
  //   this._likes = null;
  //   this._comments = null;
  // }

  async getBySlug(slug: string) {
    const Article = new AJAX(`${this.path}/slug/${slug}`, "GET");
    await Article.recieve();
    if (this.checkForErrors(Article)) return;
    this.doc = Article.data[this.getPropertyName(Article.data)];
    this._likes = null;
    this._comments = null;
  }

  // async createArticle(data: ArticleModel) {
  //   const NewArticle = new AJAX(`articles`, "POST", undefined, data);
  //   await NewArticle.recieve();
  //   if (this.checkForErrors(NewArticle)) return;
  //   this._article = NewArticle.data.article;
  // }

  // async updateArticle(id: string, data: ArticleModel) {
  //   const UpdatedArticle = new AJAX(`articles/${id}`, "PATCH", undefined, data);
  //   await UpdatedArticle.recieve();
  //   if (this.checkForErrors(UpdatedArticle)) return;
  //   this._article = UpdatedArticle.data.article;
  // }

  // async deleteArticle(id: string) {
  //   const DeletedArticle = new AJAX(`articles/${id}`, "DELETE");
  //   await DeletedArticle.recieve();
  //   if (this.checkForErrors(DeletedArticle)) return;
  // }

  async search(queryStr: string) {
    const FoundArticles = new AJAX(`${this.path}/search`, "GET", {
      q: queryStr,
    });
    await FoundArticles.recieve();
    if (this.checkForErrors(FoundArticles)) return;
    this.doc = FoundArticles.data[this.getPropertyName(FoundArticles.data)];
  }

  async getHottest<T extends object>(queries?: T) {
    let Articles: AJAX;
    if (queries) Articles = new AJAX(`${this.path}/hottest`, "GET", queries);
    else Articles = Articles = new AJAX(`${this.path}/hottest`, "GET");
    await Articles.recieve();
    if (this.checkForErrors(Articles)) return;
    this.docs = Articles.data[this.getPropertyName(Articles.data)];
  }

  async getStats(queryStr?: string) {
    const Stats = new AJAX(`${this.path}/stats`, "GET", { by: queryStr });
    await Stats.recieve();
    if (this.checkForErrors(Stats)) return;
    this._stats = Stats.data[this.getPropertyName(Stats.data)];
  }
  async getMonthlyStats(year: string) {
    const Stats = new AJAX(`${this.path}/monthly-stats/${year}`, "GET");
    await Stats.recieve();
    if (this.checkForErrors(Stats)) return;
    this._stats = Stats.data[this.getPropertyName(Stats.data)];
  }

  async getLikes(id: string) {
    const Likes = new AJAX(`${this.path}/${id}/likes`, "GET");
    await Likes.recieve();
    if (this.checkForErrors(Likes)) return;
    this._likes = Likes.data[this.getPropertyName(Likes.data)];
  }

  async toggleLike(id: string) {
    this._like = null;
    const Like = new AJAX(`${this.path}/${id}/likes`, "POST");
    await Like.recieve();
    if (this.checkForErrors(Like)) return;
    if (Like.data) this._like = Like.data[this.getPropertyName(Like.data)];
  }

  async getComments(id: string) {
    const Comments = new AJAX(`${this.path}/${id}/comments`, "GET");
    await Comments.recieve();
    if (this.checkForErrors(Comments)) return;
    this._comments = Comments.data[this.getPropertyName(Comments.data)];
  }

  async createComment(id: string) {
    const Comment = new AJAX(`${this.path}/${id}/comments`, "POST");
    await Comment.recieve();
    if (this.checkForErrors(Comment)) return;
    this._comment = Comment.data[this.getPropertyName(Comment.data)];
  }
}

export default new Article();
