import ObjIndex from "../../helpers/ObjectIndex";

export default class Component<T extends ObjIndex> {
  protected template!: string;
  protected _state!: T;
  protected _markup!: string;

  fill() {
    const keyValues = this.template
      .split("{{")
      .filter((e: string) => e.includes("}}"))
      .map((el: string) => el.split("}}")[0]);

    let fullFilledMarkup = this.template;
    keyValues.forEach((el: string) => {
      if (!this._state[el]) return;
      const currentData = String(this._state[el]);
      fullFilledMarkup = fullFilledMarkup.replace(`{{${el}}}`, currentData);
    });
    this._markup = fullFilledMarkup;
    return fullFilledMarkup;
  }

  get state() {
    return this._state;
  }

  get markup() {
    return this._markup;
  }
}
