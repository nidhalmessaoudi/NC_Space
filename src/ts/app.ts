import { stringify } from "query-string";
import "regenerator-runtime/runtime";

const testGetArticles = async (path: string, params?: object) => {
  let queries: string | undefined = undefined;
  if (params) queries = stringify(params);

  const response = queries
    ? await fetch(`${process.env.NC_SPACE_API}${path}?${queries}`)
    : await fetch(`${process.env.NC_SPACE_API}${path}`);

  return await response.json();
};

(async () => {
  const articles = await testGetArticles("articles");
  console.log(articles);
})();
