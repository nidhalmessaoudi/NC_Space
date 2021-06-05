import ObjIndex from "../helpers/ObjectIndex";

export default interface Article extends ObjIndex {
  readonly id?: string;
  readonly title?: string;
  readonly slug?: string;
  readonly category?: string;
  readonly summary?: string;
  readonly coverImage?: string;
  readonly body?: string;
  readonly tags?: string;
  readonly views?: number;
  readonly author?: {
    name: string;
    photo: string;
    id: string;
  };
  readonly readingTime?: number;
  readonly paragraphs?: number;
  readonly numberOfLikes?: number;
  readonly numberOfComments?: number;
  readonly likes?: object[];
  readonly comments?: object[];
  readonly createdAt?: Date;
}
