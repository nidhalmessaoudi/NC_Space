import ApiClass from "../apis/Api";
import ErrorComponent from "../components/Error/Error.component";

export default (Api: ApiClass) => {
  if (!Api.error) return false;
  let error = Api.error;
  if (error === "Failed to fetch")
    error = "Something went wrong! Try again later.";
  const Error = new ErrorComponent(error);
  Error.render("afterbegin");
  return true;
};
