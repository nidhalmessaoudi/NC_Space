import ObjIndex from "src/helpers/ObjectIndex";
import Component from "../Core/Component";

export default class NotFound extends Component<ObjIndex> {
  constructor() {
    super();

    this.template = this._markup = `
      <div id="${this.componentId}">
        <h2>This page is not found!</h2>
      </div>
    `;
  }
}
