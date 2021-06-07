import objIndex from "../helpers/ObjectIndex";

export default interface Error extends objIndex {
  status?: string;
  message?: string;
}
