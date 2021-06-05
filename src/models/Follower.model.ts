import objIndex from "../helpers/ObjectIndex";
import UserModel from "./User.model";

export default interface Follower extends objIndex {
  followed: UserModel;
  follower: UserModel;
}
