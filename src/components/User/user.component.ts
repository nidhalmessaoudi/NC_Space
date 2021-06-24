import Component from "../Core/Component";
import UserModel from "../../models/User.model";

export default class Like extends Component<UserModel> {
  constructor(
    private name: string,
    private username: string,
    private email: string,
    private role: string,
    private photo: string,
    private nFollowers: number,
    private nFollowings: number,
    private followed: boolean
  ) {
    super();

    this.template = `
      <div id="${this.componentId}">
        <img src="{{photo}}" alt="{{name}}"/>
        <h2>{{name}}</h2>
        <p>@{{username}}</p>
        <h5>{{role}}</h5>
        <p>Email: {{email}}</p>
        <p><b>{{numberOfFollowers}}</b> followers | <b>{{numberOfFollowings}}</b> following</p>
        <button id="follow-btn">{{follow}}</button>
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
      numberOfFollowers: this.nFollowers,
      numberOfFollowings: this.nFollowings,
      follow: this.followed ? "Followed" : "Follow",
    };

    this.fill();
  }
}
