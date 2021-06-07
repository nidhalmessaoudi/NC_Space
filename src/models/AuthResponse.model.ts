import UserModel from "./User.model";

export default interface AuthResponse extends UserModel {
  readonly message?: string;
  readonly token?: string;
}
