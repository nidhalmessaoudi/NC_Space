import { nanoid } from "nanoid";

import config from "../../utils/config";
import ObjIndex from "../../helpers/ObjectIndex";

export default class Component<T extends ObjIndex> {
  private _root: HTMLElement = config.ROOT;
  protected template!: string;
  protected _state!: T;
  protected _markup!: string;
  protected element!: HTMLElement | null;
  protected componentId: string = nanoid(6);

  get id() {
    return this.componentId;
  }

  set root(newRoot: HTMLElement) {
    this._root = newRoot;
  }

  get state() {
    return this._state;
  }

  set state(newState: T) {
    if (!this._state) this._state === newState;
    for (const prop in newState) {
      if (this._state[prop] !== newState[prop])
        this._state[prop] = newState[prop];
    }
    this.fill();
    if (this._markup.includes("{{") && this._markup.includes("}}"))
      throw new Error("Failed to update the state! Some data is missing.");

    const newLayout = document
      .createRange()
      .createContextualFragment(this._markup);
    const newEls = Array.from(newLayout.querySelectorAll("*"));
    const curEls = Array.from(this._root.querySelectorAll("*"));

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
    if (!this._state) throw new Error("There is no data to fill the template!");
    const keyValues = this.template
      .split("{{")
      .filter((e: string) => e.includes("}}"))
      .map((el: string) => el.split("}}")[0]);

    let fullFilledMarkup = this.template;
    keyValues.forEach((el: string) => {
      if (this._state[el] === null || this._state[el] === undefined) return;
      const currentData = String(this._state[el]);
      fullFilledMarkup = fullFilledMarkup.replace(`{{${el}}}`, currentData);
    });
    this._markup = fullFilledMarkup;
    return fullFilledMarkup;
  }

  private update(el: HTMLElement, newContent: string): void {
    el.textContent = newContent;
  }

  private clean(): void {
    this._root.innerHTML = "";
  }

  private isRendered() {
    if (this.element) return true;
    throw new Error("The component is not rendered in the DOM!");
  }

  removeAfter(sec: number): void {
    this.isRendered();
    setTimeout(() => {
      this._root.removeChild(this.element!);
    }, sec * 1000);
  }

  render(position: InsertPosition = "beforeend", clean?: boolean): void {
    if (clean) this.clean();
    this._root.insertAdjacentHTML(position, this._markup);
    this._root = this.element?.parentElement || this._root;
    this.element = document.getElementById(this.componentId);
  }

  remove(): void {
    this.isRendered();
    this._root.removeChild(this.element!);
  }

  clear(): void {
    this.isRendered();
    this.element!.innerHTML = "";
  }

  clearInterval(): void {
    Array.from(this._root.children).forEach((child) => {
      if (child.id === this.componentId) return;
      this._root.removeChild(child);
    });
  }
}
