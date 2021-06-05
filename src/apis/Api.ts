import AJAX from "src/utils/AJAX";

export default class Api {
  protected _error!: string;

  get error() {
    return this._error;
  }

  protected checkForErrors(obj: AJAX) {
    if (obj.error) {
      this._error = obj.error;
      return true;
    } else {
      return false;
    }
  }
}
