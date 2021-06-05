import { nanoid } from "nanoid";

import config from "../../utils/config";
import ObjIndex from "../../helpers/ObjectIndex";

export default class Component<T extends ObjIndex> {
  protected template!: string;
  protected _state!: T;
  protected _markup!: string;
  private root: HTMLElement = config.ROOT;
  protected componentId: string = nanoid(6);

  get state() {
    return this._state;
  }

  set state(newState: T) {
    if (this._state === newState) return;
    this._state = newState;
    this.fill();
    if (this._markup.includes("{{") && this._markup.includes("}}"))
      throw new Error("Failed to update the state! Some data is missing.");

    const newLayout = document
      .createRange()
      .createContextualFragment(this._markup);
    const newEls = Array.from(newLayout.querySelectorAll("*"));
    const curEls = Array.from(this.root.querySelectorAll("*"));

    newEls.forEach((newEl, i) => {
      const curEl = curEls[i] as HTMLElement;

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ""
      ) {
        this.update(curEl, newEl.textContent!);
      }
    });
  }

  get markup() {
    return this._markup;
  }

  protected fill() {
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

  // protected getId() {
  //   if (this.componentId) return;
  //   const idStart = this.template.indexOf("id") + 4;
  //   const idEnd = this.template.slice(idStart).indexOf('"') + idStart;
  //   const id = this.template.slice(idStart, idEnd);
  //   this.componentId = id;
  //   return id;
  // }

  private update(el: HTMLElement, newContent: string): void {
    el.textContent = newContent;
  }

  private clean(): void {
    this.root.innerHTML = "";
  }

  render(position: InsertPosition = "beforeend", clean?: boolean): void {
    if (clean) this.clean();
    this.root.insertAdjacentHTML(position, this._markup);
    this.root =
      document.getElementById(this.componentId)?.parentElement || this.root;
  }
}
