import ObjectIndex from "src/helpers/ObjectIndex";
import Component from "../core/Component";

export default class Spinner<T extends ObjectIndex> extends Component<T> {
  constructor() {
    super();

    this.template = this._markup = `
    <h2 id="${this.componentId}">Loading...</h2>
    `;

    this.render("afterbegin", true);
  }
}
