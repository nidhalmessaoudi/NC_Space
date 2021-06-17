import ObjIndex from "../../helpers/ObjectIndex";
import Component from "../Core/Component";

export default class Comment extends Component<ObjIndex> {
  constructor(
    private username: string,
    private name: string,
    private comment: string
  ) {
    super();

    this.template = `
      <div id="${this.componentId}">
        <h4><a href="/users/{{username}}">{{name}}</a></h4>
        <p>{{comment}}</p>
      </div>
    `;

    this._state = {
      username: this.username,
      name: this.name,
      comment: this.comment,
    };

    this.fill();
  }
}
