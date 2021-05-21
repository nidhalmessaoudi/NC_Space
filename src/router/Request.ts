export default interface Request {
  // Window and navigtor infos
  protocol: string;
  href: string;
  origin: string;
  port: string | null;
  path: string | null;
  hash: string | null;
  queries: object | null;
  locale: string;
  userAgent: string;
  platform: string;

  // Route infos
  params: {
    id?: string;
    slug?: string;
  };
}
