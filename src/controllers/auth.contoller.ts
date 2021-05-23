import Request from "../router/Request";
import Response from "../router/Response";
import markup from "../markup";
import AJAX from "../utils/AJAX";
import handleForms from "../helpers/handleForms";

export const login = (req: Request, res: Response) => {
  console.log(req.href);
  res.insert(markup["/login"], "beforeend", true);
  const loginUser = (form: HTMLFormElement) => {
    if (form.classList.contains("login-form")) {
      (async () => {
        try {
          const emailInput = form.querySelector(".email") as HTMLInputElement;
          const passInput = form.querySelector(".password") as HTMLInputElement;
          const userCredentials = {
            email: emailInput.value,
            password: passInput.value,
          };
          const User = new AJAX(
            "users/login",
            "POST",
            undefined,
            userCredentials
          );
          await User.recieve();
          const loggedUser = User.data;

          console.log(loggedUser);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };
  handleForms(loginUser);
};
