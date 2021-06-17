import UserModel from "../../models/User.model";
import Component from "../Core/Component";

export default class Navbar extends Component<UserModel> {
  constructor(private name: string, private username?: string) {
    super();

    this.template = `
      <nav id="${this.componentId}">
        <div style="float: left">  
          <a href="/">NC Space</a>
        </div>
        <div style="float: right">
          <a href="https://github.com" target="_blank">Github</a>
          <a href="{{action}}">{{name}}</a>
        </div>
      </nav>
    `;

    this._state = {
      name: this.name,
      action: this.username ? `/users/${this.username}` : "/login",
    };

    this.fill();
  }
}
