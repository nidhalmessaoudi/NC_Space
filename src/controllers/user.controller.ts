import Request from "../router/Request";
import SpinnerComponent from "../components/LoadingSpinner/Spinner.component";
import UserApi from "../apis/User";
import FollowerApi from "../apis/Follower";
import catchError from "../helpers/catchError";
import UserComponent from "../components/User/user.component";

export const getPublicUser = async (req: Request) => {
  const Spinner = new SpinnerComponent();
  Spinner.render("afterbegin", true);
  await UserApi.getUserByUsername(req.params?.username!);
  if (catchError(UserApi)) return;
  const thisUser = UserApi.user!;

  await UserApi.getCurrentUser();
  if (catchError(UserApi)) return;
  const currentUser = UserApi.user!;

  thisUser.followed = false;
  currentUser.following?.forEach((following) => {
    if (following.id === thisUser.id) {
      thisUser.followed = true;
      console.log("Hello");
    }
  });

  const User = new UserComponent(
    thisUser.name!,
    thisUser.username!,
    thisUser.email!,
    thisUser.role!,
    thisUser.photo!,
    thisUser.numberOfFollowers!,
    thisUser.numberOfFollowings!,
    thisUser.followed!
  );
  User.render("afterbegin", true);

  // Follow Handler
  const followBtn = document.getElementById("follow-btn");
  followBtn?.addEventListener("click", async (e) => {
    e.preventDefault();

    const currentState = User.state;
    User.state = { follow: "Loading" };
    await FollowerApi.toggle(currentUser.id!, thisUser.id!);
    if (catchError(FollowerApi)) {
      User.state = { follow: currentState.follow };
      return;
    }

    if (FollowerApi.follower)
      User.state = {
        follow: "Followed",
        numberOfFollowers: currentState.numberOfFollowers!++ || 1,
      };
    else
      User.state = {
        follow: "Follow",
        numberOfFollowers: currentState.numberOfFollowers!--,
      };
  });
};
