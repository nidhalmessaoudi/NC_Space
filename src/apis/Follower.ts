import Api from "./Api";
import FollowerModel from "../models/Follower.model";

class Follower extends Api<FollowerModel> {
  constructor() {
    super();
    this.path = "followers";
  }

  get followers() {
    return this.docs;
  }

  get follower() {
    return this.doc;
  }
}

export default new Follower();
