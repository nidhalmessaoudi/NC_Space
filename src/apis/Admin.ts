import AJAX from "../utils/AJAX";
import Api from "./Api";
import ArticleModel from "../models/Article.model";
import CommentModel from "../models/Comment.model";

class User extends Api<ArticleModel | CommentModel> {
  constructor() {
    super();
    this.path = "admin";
  }

  get articles() {
    return this.docs;
  }

  get article() {
    return this.doc;
  }

  get comments() {
    return this.docs;
  }

  get comment() {
    return this.doc;
  }

  async getAllArticles(queries?: ArticleModel) {
    let Docs: AJAX;
    if (queries) Docs = new AJAX(`${this.path}/articles`, "GET", queries);
    else Docs = Docs = new AJAX(`${this.path}/articles`, "GET");
    await Docs.recieve();
    if (this.checkForErrors(Docs)) return;
    this.docs = Docs.data[this.getPropertyName(Docs.data)];
  }

  async approveArticle(id: string) {
    const Doc = new AJAX(`${this.path}/approve-article/${id}`, "PATCH");
    await Doc.recieve();
    if (this.checkForErrors(Doc)) return;
    this.doc = Doc.data[this.getPropertyName(Doc.data)];
  }

  async disapproveArticle(id: string) {
    const Doc = new AJAX(`${this.path}/disapprove-article/${id}`, "DELETE");
    await Doc.recieve();
    if (this.checkForErrors(Doc)) return;
    this.doc = null;
  }

  async getAllComments(queries?: CommentModel) {
    let Docs: AJAX;
    if (queries) Docs = new AJAX(`${this.path}/comments`, "GET", queries);
    else Docs = Docs = new AJAX(`${this.path}/comments`, "GET");
    await Docs.recieve();
    if (this.checkForErrors(Docs)) return;
    this.docs = Docs.data[this.getPropertyName(Docs.data)];
  }

  async approveComment(id: string) {
    const Doc = new AJAX(`${this.path}/approve-comment/${id}`, "PATCH");
    await Doc.recieve();
    if (this.checkForErrors(Doc)) return;
    this.doc = Doc.data[this.getPropertyName(Doc.data)];
  }

  async disapproveComment(id: string) {
    const Doc = new AJAX(`${this.path}/disapprove-comment/${id}`, "DELETE");
    await Doc.recieve();
    if (this.checkForErrors(Doc)) return;
    this.doc = null;
  }
}

export default new User();
