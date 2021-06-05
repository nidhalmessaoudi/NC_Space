import ObjIndex from "../helpers/ObjectIndex";
import ArticleModel from "./Article.model";

export default interface User extends ObjIndex {
  [property: string]: string | number | object | boolean | undefined;
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly photo?: string;
  readonly role?: string;
  readonly verified?: boolean;
  readonly from?: "google" | "facebook";
  readonly googleId?: string;
  readonly facebookId?: number;
  readonly active?: boolean;
  readonly myArticles?: ArticleModel[];
  readonly bookmarks?: ArticleModel[];
  readonly followers?: User[];
  readonly following?: User[];
}
