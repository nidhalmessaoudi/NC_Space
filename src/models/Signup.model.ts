import ObjIndex from "../helpers/ObjectIndex";

export default interface Signup extends ObjIndex {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
