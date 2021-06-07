import AJAX from "../../utils/AJAX";
import Api from "../Api";
import SignupModel from "../../models/Signup.model";
import LoginModel from "../../models/Login.model";
import AuthResponseModel from "../../models/AuthResponse.model";
import UpdatePassModel from "src/models/UpdatePass.model";

class Auth extends Api {
  private _response!: AuthResponseModel;
  private _message!: string;

  get response() {
    if (!this._response)
      throw new Error(
        "Call the signup() or login() methods to get access to the response!"
      );
    return this._response;
  }

  get message() {
    if (!this._message)
      throw new Error(
        "Call the verifyEmail(), forgotPassword() or updatePassword() methods to access the message!"
      );
    return this._message;
  }

  async signup(credentials: SignupModel) {
    const Signup = new AJAX("users/signup", "POST", undefined, credentials);
    await Signup.recieve();
    if (this.checkForErrors(Signup)) return;
    this._response = Signup.data;
  }

  async login(credentials: LoginModel) {
    const Login = new AJAX("users/login", "POST", undefined, credentials);
    await Login.recieve();
    if (this.checkForErrors(Login)) return;
    this._response = Login.data.user;
  }

  async verifyEmail() {
    const VerifyEmail = new AJAX("users/send-verify-email", "GET");
    await VerifyEmail.recieve();
    if (this.checkForErrors(VerifyEmail)) return;
    this._message = VerifyEmail.data.message;
  }

  async forgotPassword(email: string) {
    const ForgotPassword = new AJAX("users/forgot-password", "GET", undefined, {
      email,
    });
    await ForgotPassword.recieve();
    if (this.checkForErrors(ForgotPassword)) return;
    this._message = ForgotPassword.data.message;
  }

  async updatePassword(passObj: UpdatePassModel) {
    const UpdatePassord = new AJAX(
      "users/update-password",
      "PATCH",
      undefined,
      passObj
    );
    await UpdatePassord.recieve();
    if (this.checkForErrors(UpdatePassord)) return;
    this._message = UpdatePassord.data.message;
  }
}

export default new Auth();
