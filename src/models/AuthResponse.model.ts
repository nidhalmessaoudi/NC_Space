import ObjIndex from "../helpers/ObjectIndex";

export default interface AuthResponse extends ObjIndex {
  readonly message: string;
  readonly token: string;
}
