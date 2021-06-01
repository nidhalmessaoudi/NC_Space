export default interface Article {
  [property: string]: string | number | object | undefined;
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
}
