import objIndex from "../helpers/ObjectIndex";
import ArticleModel from "./Article.model";
import UserModel from "./User.model";

export default interface Bookmark extends objIndex {
  readonly article: ArticleModel;
  readonly user: UserModel;
}
