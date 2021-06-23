import Api from "./Api";
import CommentModel from "../models/Comment.model";

class Comment extends Api<CommentModel> {
  constructor() {
    super();
    this.path = "comments";
  }

  get comments() {
    return this.docs;
  }

  get comment() {
    return this.doc;
  }
}

export default new Comment();
