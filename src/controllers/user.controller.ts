import Request from "../router/Request";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import UserApi from "../apis/User";
import catchError from "../helpers/catchError";
import UserComponent from "../components/User/user.component";

export const getPublicUser = async (req: Request) => {
  const Spinner = new SpinnerComponent();
  Spinner.render("afterbegin", true);
  await UserApi.getUserByUsername(req.params.username!);

  if (catchError(UserApi)) return;

  const user = UserApi.user!;

  const User = new UserComponent(
    user.name!,
    user.username!,
    user.email!,
    user.role!,
    user.photo!
  );
  User.render("afterbegin", true);
};
