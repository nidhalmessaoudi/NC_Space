import Component from "../Core/Component";
import UserModel from "../../models/User.model";

export default class Like extends Component<UserModel> {
  constructor(private username: string, private name: string) {
    super();

    this.template = `
      <div id="${this.componentId}">
        <a href="/users/{{username}}">{{name}}</a>
      </div>
    `;

    this._state = {
      username: this.username,
      name: this.name,
    };

    this.fill();
  }
}
