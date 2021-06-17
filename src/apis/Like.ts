import AJAX from "../utils/AJAX";
import Api from "./Api";
import LikeModel from "../models/Like.model";

class Like extends Api {
  private _likes!: LikeModel[];
  private _like!: LikeModel;

  get likes() {
    if (!this._likes)
      throw new Error(
        "You must call the getLikes() method before accessing the likes!"
      );
    return this._likes;
  }

  get like() {
    if (!this._like)
      throw new Error(
        "You must call the getLike() method before accessing the like!"
      );
    return this._like;
  }

  async getLikes<T extends object>(queries?: T) {
    let Likes: AJAX;
    if (queries) Likes = new AJAX("likes", "GET", queries);
    else Likes = Likes = new AJAX("likes", "GET");
    await Likes.recieve();
    if (this.checkForErrors(Likes)) return;
    this._likes = Likes.data.likes;
  }

  async getLike(id: string) {
    const Like = new AJAX(`likes/${id}`, "GET");
    await Like.recieve();
    if (this.checkForErrors(Like)) return;
    this._likes = Like.data.like;
  }

  async toggleLike(id: string) {
    const Like = new AJAX(`likes`, "POST", undefined, { article: id });
    await Like.recieve();
    if (this.checkForErrors(Like)) return;
    this._like = Like.data.like;
  }
}

export default new Like();
