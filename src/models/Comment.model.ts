import objIndex from "../helpers/ObjectIndex";
import ArticleModel from "./Article.model";
import UserModel from "./User.model";

export default interface Comment extends objIndex {
  comment: string;
  article: ArticleModel;
  author: UserModel;
}
