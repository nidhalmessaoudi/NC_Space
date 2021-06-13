import ObjIndex from "src/helpers/ObjectIndex";
import UserModel from "src/models/User.model";
import Component from "../Core/Component";

export default class Navbar extends Component<ObjIndex> {
  constructor(
    private loggedIn: boolean,
    private action: string,
    private name?: keyof UserModel
  ) {
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

    if (this.loggedIn) this._state = { name: this.name, action: this.action };
    else this._state = { name: "Login", action: "/login" };

    this.fill();
  }
}
