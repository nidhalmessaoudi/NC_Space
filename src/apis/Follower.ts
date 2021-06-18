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

  // async getFollowers<T extends object>(queries?: T) {
  //   let Followers: AJAX;
  //   if (queries) Followers = new AJAX("followers", "GET", queries);
  //   else Followers = Followers = new AJAX("followers", "GET");
  //   await Followers.recieve();
  //   if (this.checkForErrors(Followers)) return;
  //   this._followers = Followers.data.followers;
  // }

  // async getFollower(id: string) {
  //   const Follower = new AJAX(`followers/${id}`, "GET");
  //   await Follower.recieve();
  //   if (this.checkForErrors(Follower)) return;
  //   this._follower = Follower.data.follower;
  // }
}

export default new Follower();
