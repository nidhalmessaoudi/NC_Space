import objIndex from "../helpers/ObjectIndex";

export default interface Success extends objIndex {
  status?: string;
  message?: string;
}
