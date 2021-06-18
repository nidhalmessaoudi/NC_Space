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

  // async getBookmarks<T extends object>(queries?: T) {
  //   let Bookmarks: AJAX;
  //   if (queries) Bookmarks = new AJAX("bookmarks", "GET", queries);
  //   else Bookmarks = Bookmarks = new AJAX("bookmarks", "GET");
  //   await Bookmarks.recieve();
  //   if (this.checkForErrors(Bookmarks)) return;
  //   this._bookmarks = Bookmarks.data.bookmarks;
  // }

  // async getBookmark(id: string) {
  //   const Bookmark = new AJAX(`bookmarks/${id}`, "GET");
  //   await Bookmark.recieve();
  //   if (this.checkForErrors(Bookmark)) return;
  //   this._bookmark = Bookmark.data.bookmark;
  // }

  // async toggleBookmark(id: string) {
  //   const Bookmark = new AJAX(`bookmarks`, "POST", undefined, { article: id });
  //   await Bookmark.recieve();
  //   if (this.checkForErrors(Bookmark)) return;
  //   this._bookmark = Bookmark.data.bookmark;
  // }
}

export default new Bookmark();
