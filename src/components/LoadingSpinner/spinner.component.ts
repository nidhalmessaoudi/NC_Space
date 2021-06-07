import ObjectIndex from "src/helpers/ObjectIndex";
import Component from "../Core/Component";

export default class Spinner<T extends ObjectIndex> extends Component<T> {
  constructor() {
    super();

    this.template = this._markup = `
      <div id="${this.componentId}">
        <h2>Loading...</h2>
      </div>
    `;
  }
}
