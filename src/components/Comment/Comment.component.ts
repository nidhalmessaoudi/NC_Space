import ObjIndex from "../../helpers/ObjectIndex";
import Component from "../Core/Component";

export default class Comment extends Component<ObjIndex> {
  constructor(
    private action: string,
    private name: string,
    private comment: string
  ) {
    super();

    this.template = `
      <div id="${this.componentId}">
        <h4><a href="{{action}}">{{name}}</a></h4>
        <p>{{comment}}</p>
      </div>
    `;

    this._state = {
      action: this.action,
      name: this.name,
      comment: this.comment,
    };

    this.fill();
  }
}
