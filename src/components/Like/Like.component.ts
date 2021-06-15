import ObjIndex from "../../helpers/ObjectIndex";
import Component from "../Core/Component";

export default class Like extends Component<ObjIndex> {
  constructor(private action: string, private name: string) {
    super();

    this.template = `
      <div id="${this.componentId}">
        <a href="{{action}}">{{name}}</a>
      </div>
    `;

    this._state = {
      action: this.action,
      name: this.name,
    };

    this.fill();
  }
}
