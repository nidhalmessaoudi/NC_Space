import Request from "../router/Request";
import Api from "../apis/authentication/Auth";
import LoginModel from "src/models/Login.model";
import LoginComponent from "../components/Login/Login.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import ErrorComponent from "../components/Error/Error.component";
import SuccessComponent from "../components/Success/Success.component";

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
    await Api.login(credentials);
    emailInput.value = "";
    passInput.value = "";
    Spinner.remove();
    if (Api.error) {
      console.log(Api.error);
      const Error = new ErrorComponent(Api.error);
      Error.render("afterbegin");
      return;
    }
    const successMsg = `You successfully logged in as ${Api.response.name}`;
    const Success = new SuccessComponent(successMsg);
    Success.render("afterbegin");
  });
};
