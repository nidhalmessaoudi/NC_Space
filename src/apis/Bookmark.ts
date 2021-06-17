import AJAX from "../utils/AJAX";
import Api from "./Api";
import BookmarkModel from "../models/Bookmark.model";

class Bookmark extends Api {
  private _bookmarks!: BookmarkModel[];
  private _bookmark!: BookmarkModel;

  get bookmarks() {
    if (!this._bookmarks)
      throw new Error(
        "You must call the getBookmarks() method before accessing the bookmarks!"
      );
    return this._bookmarks;
  }

  get bookmark() {
    if (!this._bookmark)
      throw new Error(
        "You must call the getBookmarks() method before accessing the bookmark!"
      );
    return this._bookmark;
  }

  async getBookmarks<T extends object>(queries?: T) {
    let Bookmarks: AJAX;
    if (queries) Bookmarks = new AJAX("bookmarks", "GET", queries);
    else Bookmarks = Bookmarks = new AJAX("bookmarks", "GET");
    await Bookmarks.recieve();
    if (this.checkForErrors(Bookmarks)) return;
    this._bookmarks = Bookmarks.data.bookmarks;
  }

  async getBookmark(id: string) {
    const Bookmark = new AJAX(`bookmarks/${id}`, "GET");
    await Bookmark.recieve();
    if (this.checkForErrors(Bookmark)) return;
    this._bookmark = Bookmark.data.bookmark;
  }

  async toggleBookmark(id: string) {
    const Bookmark = new AJAX(`bookmarks`, "POST", undefined, { article: id });
    await Bookmark.recieve();
    if (this.checkForErrors(Bookmark)) return;
    this._bookmark = Bookmark.data.bookmark;
  }
}

export default new Bookmark();
