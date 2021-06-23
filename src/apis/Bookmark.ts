import Api from "./Api";
import BookmarkModel from "../models/Bookmark.model";

class Bookmark extends Api<BookmarkModel> {
  constructor() {
    super();
    this.path = "bookmarks";
  }

  get bookmarks() {
    return this.docs;
  }

  get bookmark() {
    return this.doc;
  }
}

export default new Bookmark();
