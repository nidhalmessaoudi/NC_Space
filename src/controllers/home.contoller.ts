import Request from "../router/Request";
import Response from "../router/Response";
import markup from "../markup";

export const getHome = (_: Request, res: Response) => {
  res.setTitle("NC Space");
  res.insert(markup["/"], "beforeend", true);
};

export const getNotFound = (_: Request, res: Response) => {
  res.setTitle("NC Space | Not Found");
  res.insert("<h2>This page is not found!</h2>", "beforeend", true);
};
