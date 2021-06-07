import Request from "../router/Request";
import Api from "../apis/authentication/Auth";
import LoginModel from "src/models/Login.model";
import LoginComponent from "../components/Login/Login.component";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import ErrorComponent from "../components/Error/Error.component";

export const login = (_: Request) => {
  const Login = new LoginComponent();
  Login.render("beforeend", true);
  const loginForm = document.getElementById("login-form") as HTMLFormElement;
  const emailInput = document.getElementById("email-input") as HTMLInputElement;
  const passInput = document.getElementById("pass-input") as HTMLInputElement;

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const credentials: LoginModel = {
      email: emailInput?.value,
      password: passInput?.value,
    };
    const Spinner = new SpinnerComponent();
    Spinner.render();
    await Api.login(credentials);
    Spinner.remove();
    if (Api.error) {
      console.log(Api.error);
      const Error = new ErrorComponent(Api.error);
      Error.render("afterbegin");
    }
  });
};
