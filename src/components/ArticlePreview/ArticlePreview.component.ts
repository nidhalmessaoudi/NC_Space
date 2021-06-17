import ArticleModel from "../../models/Article.model";
import Component from "../Core/Component";

export default class ArticlePreview extends Component<ArticleModel> {
  constructor(private title: string, private ArticleSlug: string) {
    super();

    this.template = `
      <div id="${this.componentId}">
          <a href="/articles/{{slug}}">{{title}}</a>
      </div>
    `;

    this._state = {
      title: this.title,
      slug: this.ArticleSlug,
    };

    this.fill();
  }
}
