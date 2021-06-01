import Request from "../router/Request";
import Response from "../router/Response";
import markup from "../markup";
import AJAX from "../utils/AJAX";
import handleForms from "../helpers/handleForms";
import ArticleComponent from "../components/Article/Article.component";
import ArticlePreviewComponent from "../components/ArticlePreview/ArticlePreview.component";
import ArticleStructure from "../helpers/Article";

export const getArticles = (req: Request, res: Response) => {
  console.log(req.href);
  res.insert(markup["/articles"], "beforeend", true);
  const printArticles = (form: HTMLFormElement) => {
    if (form.classList.contains("get_all-form")) {
      (async () => {
        try {
          const Articles = new AJAX("articles", "GET");
          await Articles.recieve();
          const articles: ArticleStructure[] = Articles.data.articles;
          articles.forEach((article: ArticleStructure) => {
            const articlePrevLayout = new ArticlePreviewComponent(
              article.title!,
              article.id!
            );
            res.insert(articlePrevLayout.markup, "beforeend", false);
          });
          console.log(articles);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };
  handleForms(printArticles);
};

export const getArticle = (req: Request, res: Response) => {
  console.log(req.href);
  res.insert(markup["/article"], "beforeend", true);
  const printArticle = (form: HTMLFormElement) => {
    if (form.classList.contains("get_one-form")) {
      (async () => {
        try {
          const Article = new AJAX(`articles/${req.params.slug}`, "GET");
          await Article.recieve();
          const article = Article.data.article;
          if (!article) return;
          const articleLayout = new ArticleComponent(
            article.title,
            article.slug,
            article.category,
            article.createdAt,
            article.views,
            article.coverImage,
            article.summary,
            article.body,
            article.tags
          );
          res.insert(articleLayout.markup, "beforeend", true);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };
  handleForms(printArticle);
};

export const createArticle = (req: Request, res: Response) => {
  console.log(req.href);
  res.insert(markup["/create"], "beforeend", true);
  const createArticle = (form: HTMLFormElement) => {
    if (form.classList.contains("create-form")) {
      (async () => {
        try {
          const nameInput = form.querySelector(
            ".article-name"
          ) as HTMLInputElement;

          const categoryInput = form.querySelector(
            ".article-category"
          ) as HTMLInputElement;

          const ReadTimeInput = form.querySelector(
            ".article-reading-time"
          ) as HTMLInputElement;

          const imageUrlInput = form.querySelector(
            ".article-cover-image"
          ) as HTMLInputElement;

          const paragraphsInput = form.querySelector(
            ".article-paragraphs"
          ) as HTMLInputElement;

          const bodyInput = form.querySelector(
            ".article-body"
          ) as HTMLTextAreaElement;

          const newArticle = {
            name: nameInput.value,
            category: categoryInput.value,
            readingTime: ReadTimeInput.value,
            coverImage: imageUrlInput.value,
            paragraphs: paragraphsInput.value,
            body: bodyInput.value,
          };
          const Article = new AJAX("articles", "POST", undefined, newArticle);
          await Article.recieve();
          const savedArticle = Article.data;

          console.log(savedArticle);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };
  handleForms(createArticle);
};
