import Component from "../Core/Component";
import LoginModel from "../../models/Login.model";

export default class Login extends Component<LoginModel> {
  constructor() {
    super();

    this.template = this._markup = `
        <div id="${this.componentId}">
            <form id="login-form">
              <label for="email-input">Email</label>
              <input type="email" id="email-input">
              <label for="pass-input">Password</label>
              <input type="password" id="pass-input">
              <button type="submit">Login</button>
            </form>
        </div>
    `;
  }
}
