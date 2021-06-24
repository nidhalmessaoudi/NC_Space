import AJAX from "../utils/AJAX";
import ObjIndex from "../helpers/ObjectIndex";

export default class Api<T extends ObjIndex> {
  protected path!: string;
  protected docs!: T[] | null;
  protected doc!: T | null;
  protected _error!: string | null;

  get error() {
    return this._error;
  }

  protected checkForErrors(obj: AJAX) {
    if (obj.error) {
      this._error = obj.error;
      return true;
    } else {
      this._error = null;
      return false;
    }
  }

  protected getPropertyName(obj: T) {
    const propertyArr = Object.getOwnPropertyNames(obj);
    if (propertyArr.length > 1)
      throw new Error("The given object contains more than one property!");
    return propertyArr[0];
  }

  async getAll(queries?: T) {
    let Docs: AJAX;
    if (queries) Docs = new AJAX(this.path, "GET", queries);
    else Docs = Docs = new AJAX(this.path, "GET");
    await Docs.recieve();
    if (this.checkForErrors(Docs)) return;
    this.docs = Docs.data[this.getPropertyName(Docs.data)];
  }

  async getOne(id: string) {
    const Doc = new AJAX(`${this.path}/${id}`, "GET");
    await Doc.recieve();
    if (this.checkForErrors(Doc)) return;
    this.doc = Doc.data[this.getPropertyName(Doc.data)];
  }

  async create(data: T) {
    const Doc = new AJAX(this.path, "POST", undefined, data);
    await Doc.recieve();
    if (this.checkForErrors(Doc)) return;
    this.doc = Doc.data[this.getPropertyName(Doc.data)];
  }

  async update(id: string, data: T) {
    const UpdatedDoc = new AJAX(`${this.path}/${id}`, "PATCH", undefined, data);
    await UpdatedDoc.recieve();
    if (this.checkForErrors(UpdatedDoc)) return;
    this.doc = UpdatedDoc.data[this.getPropertyName(UpdatedDoc.data)];
  }

  async delete(id: string) {
    const DeletedDoc = new AJAX(`${this.path}/${id}`, "DELETE");
    await DeletedDoc.recieve();
    if (this.checkForErrors(DeletedDoc)) return;
  }

  async toggle(id: string, followedId: string) {
    this.doc = null;
    let Doc: AJAX;
    if (followedId)
      Doc = new AJAX(this.path, "POST", undefined, {
        follower: id,
        followed: followedId,
      });
    else
      Doc = new AJAX(this.path, "POST", undefined, {
        article: id,
      });
    await Doc.recieve();
    if (this.checkForErrors(Doc)) return;
    if (Doc.data) this.doc = Doc.data[this.getPropertyName(Doc.data)];
  }

  clearDocs(): void {
    this.doc = null;
    this.docs = null;
    this._error = null;
  }
}
