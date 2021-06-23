import ApiClass from "../apis/Api";
import ErrorModel from "src/models/Error.model";
import ErrorComponent from "../components/Error/Error.component";

export default (Api: ApiClass<ErrorModel>) => {
  if (!Api.error) return false;
  let error = Api.error;
  if (error === "Failed to fetch")
    error = "Something went wrong! Try reloading.";
  const Error = new ErrorComponent(error);
  Error.render("afterbegin");
  return true;
};
