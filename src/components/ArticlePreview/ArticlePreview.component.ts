import ArticleModel from "../../models/Article.model";
import Component from "../Core/Component";

export default class ArticlePreview extends Component<ArticleModel> {
  constructor(private title: string, private Articleid: string) {
    super();

    this.template = `
      <div id="${this.componentId}">
          <a href="/articles/{{id}}">{{title}}</a>
      </div>
    `;

    this._state = {
      title: this.title,
      id: this.Articleid,
    };

    this.fill();
  }
}
