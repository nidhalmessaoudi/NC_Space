import AJAX from "../utils/AJAX";
import Api from "./Api";
import CommentModel from "../models/Comment.model";

class Comment extends Api {
  private _comments!: CommentModel[];
  private _comment!: CommentModel;

  get comments() {
    if (!this._comments)
      throw new Error(
        "You must call the getComments() method before accessing the comments!"
      );
    return this._comments;
  }

  get comment() {
    if (!this._comment)
      throw new Error(
        "You must call the getComment() method before accessing the comment!"
      );
    return this._comment;
  }

  async getComments<T extends object>(queries?: T) {
    let Comments: AJAX;
    if (queries) Comments = new AJAX("comments", "GET", queries);
    else Comments = Comments = new AJAX("comments", "GET");
    await Comments.recieve();
    if (this.checkForErrors(Comments)) return;
    this._comments = Comments.data.likes;
  }

  async getComment(id: string) {
    const Comment = new AJAX(`comments/${id}`, "GET");
    await Comment.recieve();
    if (this.checkForErrors(Comment)) return;
    this._comments = Comment.data.comment;
  }

  async createComment(comment: string, articleId: string) {
    const NewComment = new AJAX(`comments`, "POST", undefined, {
      comment,
      article: articleId,
    });
    await NewComment.recieve();
    if (this.checkForErrors(NewComment)) return;
    this._comment = NewComment.data.comment;
  }

  async updateComment(id: string, data: CommentModel) {
    const NewComment = new AJAX(`comments/${id}`, "PATCH", undefined, data);
    await NewComment.recieve();
    if (this.checkForErrors(NewComment)) return;
    this._comment = NewComment.data.comment;
  }

  async deleteComment(id: string) {
    const Comment = new AJAX(`comments/${id}`, "DELETE");
    await Comment.recieve();
    if (this.checkForErrors(Comment)) return;
  }
}

export default new Comment();
