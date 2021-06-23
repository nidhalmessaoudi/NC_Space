import Request from "../router/Request";
import AuthApi from "../apis/Auth";
import LoginModel from "../models/Login.model";
import LoginComponent from "../components/Login/Login.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import SuccessComponent from "../components/Success/Success.component";
import catchError from "../helpers/catchError";
import SignupModel from "../models/Signup.model";
import SignupComponent from "../components/Signup/Signup.component";
import SocialLoginComponent from "../components/SocialLogin/SocialLogin.component";

export const signup = async (_: Request) => {
  const SignupSpinner = new SpinnerComponent();

  const Signup = new SignupComponent();
  Signup.render("beforeend", true);

  SignupSpinner.render("beforeend");
  await AuthApi.loginWithGoogle();
  if (catchError(AuthApi)) {
    SignupSpinner.remove();
    return;
  }
  await AuthApi.loginWithFacebook();
  if (catchError(AuthApi)) return;
  SignupSpinner.remove();

  const SocialLogin = new SocialLoginComponent(
    AuthApi.googleUrl!,
    AuthApi.fbUrl!
  );
  SocialLogin.render();

  const signupForm = document.getElementById("signup-form") as HTMLFormElement;
  const nameInput = document.getElementById("name-input") as HTMLInputElement;
  const sgnEmailInput = document.getElementById(
    "sgn_email-input"
  ) as HTMLInputElement;
  const sgnPassInput = document.getElementById(
    "sgn_pass-input"
  ) as HTMLInputElement;
  const passConfInput = document.getElementById(
    "pass_confirm-input"
  ) as HTMLInputElement;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    Signup.clearInterval();
    const sgnCredentials: SignupModel = {
      name: nameInput.value,
      email: sgnEmailInput.value,
      password: sgnPassInput.value,
      passwordConfirm: passConfInput.value,
    };
    SignupSpinner.render("afterbegin");
    await AuthApi.signup(sgnCredentials);
    nameInput.value = "";
    sgnEmailInput.value = "";
    sgnPassInput.value = "";
    passConfInput.value = "";
    SignupSpinner.remove();
    if (catchError(AuthApi)) return;

    const signupSuccess = new SuccessComponent(AuthApi.message!);
    signupSuccess.render("afterbegin");
  });
};

export const login = (_: Request) => {
  const Login = new LoginComponent();
  Login.render("beforeend", true);
  const loginForm = document.getElementById("login-form") as HTMLFormElement;
  const emailInput = document.getElementById("email-input") as HTMLInputElement;
  const passInput = document.getElementById("pass-input") as HTMLInputElement;

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    Login.clearInterval();
    const credentials: LoginModel = {
      email: emailInput?.value,
      password: passInput?.value,
    };
    const Spinner = new SpinnerComponent();
    Spinner.render("afterbegin");
    await AuthApi.login(credentials);
    emailInput.value = "";
    passInput.value = "";
    Spinner.remove();
    if (catchError(AuthApi)) return;

    const successMsg = `You successfully logged in as ${AuthApi.user!.name}`;
    const Success = new SuccessComponent(successMsg);
    Success.render("afterbegin");
  });
};
