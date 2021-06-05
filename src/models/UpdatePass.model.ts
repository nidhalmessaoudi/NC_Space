import ObjIndex from "../helpers/ObjectIndex";

export default interface UpdatePass extends ObjIndex {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
