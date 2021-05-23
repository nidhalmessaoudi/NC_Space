import Request from "../router/Request";
import Response from "../router/Response";
import markup from "../markup";
// import AJAX from "../utils/AJAX";
// import handleForms from "../helpers/handleForms";

export const getHome = (req: Request, res: Response) => {
  console.log(req.href);
  res.insert(markup["/"], "beforeend", true);
};

export const getNotFound = (req: Request, res: Response) => {
  console.log(req.href);
  res.insert("<h2>This page is not found!</h2>", "beforeend", true);
};
