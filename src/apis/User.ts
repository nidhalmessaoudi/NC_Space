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

  // async getUsers<T extends object>(queries?: T) {
  //   let Users: AJAX;
  //   if (queries) Users = new AJAX("users", "GET", queries);
  //   else Users = Users = new AJAX("users", "GET");
  //   await Users.recieve();
  //   if (this.checkForErrors(Users)) return;
  //   this._users = Users.data.users;
  // }

  // async getUser(id: string) {
  //   const User = new AJAX(`users/${id}`, "GET");
  //   await User.recieve();
  //   if (this.checkForErrors(User)) return;
  //   this._user = User.data.user;
  // }

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

  // async updateUser(id: string, data: UserModel) {
  //   const UpdatedUser = new AJAX(`users/${id}`, "PATCH", undefined, data);
  //   await UpdatedUser.recieve();
  //   if (this.checkForErrors(UpdatedUser)) return;
  //   this._user = UpdatedUser.data.user;
  // }

  // async deleteUser(id: string) {
  //   const DeletedUser = new AJAX(`users/${id}`, "DELETE");
  //   await DeletedUser.recieve();
  //   if (this.checkForErrors(DeletedUser)) return;
  // }
}

export default new User();
