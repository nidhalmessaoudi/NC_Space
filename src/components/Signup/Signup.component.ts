import Component from "../Core/Component";
import SignupModel from "../../models/Signup.model";

export default class Signup extends Component<SignupModel> {
  constructor() {
    super();

    this.template = this._markup = `
        <div id="${this.componentId}">
            <form id="signup-form">
              <div>
                <label for="name-input">Full Name</label>
                <input type="text" id="name-input">
              </div>
              <div>
                <label for="sgn_email-input">Email</label>
                <input type="email" id="sgn_email-input">
              </div>
              <div>
                <label for="sgn_pass-input">Password</label>
                <input type="password" id="sgn_pass-input">
              </div>
              <div>
                <label for="pass_confirm-input">Confirm Password</label>
                <input type="password" id="pass_confirm-input">
              </div>
              <button type="submit">Login</button>
            </form>
            <p>Already signed up? <a href="/login">Login</a></p>
        </div>
    `;
  }
}
