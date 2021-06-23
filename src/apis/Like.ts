import Api from "./Api";
import LikeModel from "../models/Like.model";

class Like extends Api<LikeModel> {
  constructor() {
    super();
    this.path = "likes";
  }

  get likes() {
    return this.docs;
  }

  get like() {
    return this.doc;
  }
}

export default new Like();
