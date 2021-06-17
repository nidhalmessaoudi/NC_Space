import AJAX from "../utils/AJAX";
import Api from "./Api";
import FollowerModel from "../models/Follower.model";

class Follower extends Api {
  private _followers!: FollowerModel[];
  private _follower!: FollowerModel;

  get followers() {
    if (!this._followers)
      throw new Error(
        "You must call the getFollowers() method before accessing the followers!"
      );
    return this._followers;
  }

  get follower() {
    if (!this._follower)
      throw new Error(
        "You must call the getFollower() method before accessing the follower!"
      );
    return this._follower;
  }

  async getFollowers<T extends object>(queries?: T) {
    let Followers: AJAX;
    if (queries) Followers = new AJAX("followers", "GET", queries);
    else Followers = Followers = new AJAX("followers", "GET");
    await Followers.recieve();
    if (this.checkForErrors(Followers)) return;
    this._followers = Followers.data.followers;
  }

  async getFollower(id: string) {
    const Follower = new AJAX(`followers/${id}`, "GET");
    await Follower.recieve();
    if (this.checkForErrors(Follower)) return;
    this._follower = Follower.data.follower;
  }

  async toggleFollower(id: string) {
    const Follower = new AJAX(`followers`, "POST", undefined, { article: id });
    await Follower.recieve();
    if (this.checkForErrors(Follower)) return;
    this._follower = Follower.data.follower;
  }
}

export default new Follower();
