import AJAX from "../utils/AJAX";
import Api from "./Api";
import SignupModel from "../models/Signup.model";
import LoginModel from "../models/Login.model";
import AuthResponseModel from "../models/AuthResponse.model";
import UpdatePassModel from "../models/UpdatePass.model";
import UserModel from "../models/User.model";

class Auth extends Api<LoginModel> {
  private _response!: AuthResponseModel | null;
  private _message!: string | null;
  private _user!: UserModel | null;
  private _googleUrl!: string | null;
  private _fbUrl!: string | null;

  constructor() {
    super();
    this.path = "users";
  }

  get response() {
    return this._response;
  }

  get message() {
    return this._message;
  }

  get user() {
    return this._user;
  }

  get googleUrl() {
    return this._googleUrl;
  }

  get fbUrl() {
    return this._fbUrl;
  }

  async signup(credentials: SignupModel) {
    const Signup = new AJAX(
      `${this.path}/signup`,
      "POST",
      undefined,
      credentials
    );
    await Signup.recieve();
    if (this.checkForErrors(Signup)) return;
    this._message = Signup.data.message;
  }

  async login(credentials: LoginModel) {
    const Login = new AJAX(
      `${this.path}/login`,
      "POST",
      undefined,
      credentials
    );
    await Login.recieve();
    if (this.checkForErrors(Login)) return;
    this._user = Login.data.user;
  }

  async loginWithGoogle() {
    if (this._googleUrl) this._googleUrl = null;
    const GoogleLogin = new AJAX(`${this.path}/google-login`, "GET");
    await GoogleLogin.recieve();
    if (this.checkForErrors(GoogleLogin)) return;
    this._googleUrl = GoogleLogin.data.googleLoginLink;
  }

  async loginWithFacebook() {
    if (this._fbUrl) this._fbUrl = null;
    const FacebookLogin = new AJAX(`${this.path}/facebook-login`, "GET");
    await FacebookLogin.recieve();
    if (this.checkForErrors(FacebookLogin)) return;
    this._fbUrl = FacebookLogin.data.facebookLoginLink;
  }

  async verifyEmail() {
    const VerifyEmail = new AJAX(`${this.path}/send-verify-email`, "GET");
    await VerifyEmail.recieve();
    if (this.checkForErrors(VerifyEmail)) return;
    this._message = VerifyEmail.data.message;
  }

  async forgotPassword(email: string) {
    const ForgotPassword = new AJAX(
      `${this.path}/forgot-password`,
      "GET",
      undefined,
      {
        email,
      }
    );
    await ForgotPassword.recieve();
    if (this.checkForErrors(ForgotPassword)) return;
    this._message = ForgotPassword.data.message;
  }

  async updatePassword(passObj: UpdatePassModel) {
    const UpdatePassord = new AJAX(
      `${this.path}/update-password`,
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
