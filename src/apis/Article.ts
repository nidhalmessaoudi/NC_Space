import AJAX from "../utils/AJAX";
import Api from "./Api";
import ArticleModel from "../models/Article.model";
import LikeModel from "../models/Like.model";
import CommentModel from "../models/Comment.model";
import BookmarkModel from "../models/Bookmark.model";

class Article extends Api<ArticleModel> {
  private _likes!: LikeModel[] | null;
  private _like!: LikeModel | null;
  private _comments!: CommentModel[] | null;
  private _comment!: CommentModel | null;
  private _bookmark!: BookmarkModel | null;
  private _bookmarks!: BookmarkModel[] | null;
  private _message!: string;
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

  get bookmarks() {
    return this._bookmarks;
  }

  get bookmark() {
    return this._bookmark;
  }

  get message() {
    return this._message;
  }

  get stats() {
    return this._stats;
  }

  async getBySlug(slug: string) {
    const Article = new AJAX(`${this.path}/slug/${slug}`, "GET");
    await Article.recieve();
    if (this.checkForErrors(Article)) return;
    this.doc = Article.data[this.getPropertyName(Article.data)];
    this._likes = null;
    this._comments = null;
  }

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

  async createComment(id: string, comment: string) {
    const Comment = new AJAX(`${this.path}/${id}/comments`, "POST", undefined, {
      comment,
    });
    await Comment.recieve();
    if (this.checkForErrors(Comment)) return;
    if (Comment.data.message) {
      this._message = Comment.data.message;
      return;
    }
    this._comment = Comment.data[this.getPropertyName(Comment.data)];
  }

  async getBookmarks(id: string) {
    const Bookmarks = new AJAX(`${this.path}/${id}/bookmarks`, "GET");
    await Bookmarks.recieve();
    if (this.checkForErrors(Bookmarks)) return;
    this._bookmarks = Bookmarks.data[this.getPropertyName(Bookmarks.data)];
  }

  async toggleBookmark(id: string) {
    this._bookmark = null;
    const Bookmark = new AJAX(`${this.path}/${id}/bookmarks`, "POST");
    await Bookmark.recieve();
    if (this.checkForErrors(Bookmark)) return;
    if (Bookmark.data)
      this._bookmark = Bookmark.data[this.getPropertyName(Bookmark.data)];
  }
}

export default new Article();
