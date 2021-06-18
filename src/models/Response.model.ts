export default interface Response {
  readonly status?: number;
  readonly data?: object[];
  readonly message?: string;
  readonly token?: string;
}
