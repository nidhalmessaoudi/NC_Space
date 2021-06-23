import Component from "../Core/Component";
import UserModel from "../../models/User.model";

export default class Like extends Component<UserModel> {
  constructor(
    private name: string,
    private username: string,
    private email: string,
    private role: string,
    private photo: string
  ) {
    super();

    this.template = `
      <div id="${this.componentId}">
        <img src="{{photo}}" alt="{{name}}"/>
        <h2>{{name}}</h2>
        <p>@{{username}}</p>
        <h5>{{role}}</h5>
        <p>Email: {{email}}</p>
      </div>
    `;

    const userPicture = `https://ui-avatars.com/api/?name=${this.name.replace(
      " ",
      "+"
    )}`;

    this._state = {
      username: this.username,
      name: this.name,
      email: this.email,
      role: this.role === "admin" || this.role === "writer" ? this.role : "",
      photo: this.photo || userPicture,
    };

    this.fill();
  }
}
