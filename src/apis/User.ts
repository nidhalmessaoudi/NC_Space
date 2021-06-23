import AJAX from "../utils/AJAX";
import Api from "./Api";
import UserModel from "../models/User.model";

class User extends Api<UserModel> {
  constructor() {
    super();
    this.path = "users";
  }

  get users() {
    return this.docs;
  }

  get user() {
    return this.doc;
  }

  async getUserByUsername(username: string) {
    const User = new AJAX(`users/public/${username}`, "GET");
    await User.recieve();
    if (this.checkForErrors(User)) return;
    this.doc = User.data[this.getPropertyName(User.data)];
  }

  async getCurrentUser() {
    const User = new AJAX(`users/me`, "GET");
    await User.recieve();
    if (this.checkForErrors(User)) return;
    this.doc = User.data[this.getPropertyName(User.data)];
  }
}

export default new User();
