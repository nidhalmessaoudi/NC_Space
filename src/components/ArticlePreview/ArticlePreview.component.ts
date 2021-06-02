import ArticleStructure from "../../helpers/Article";
import Component from "../core/Component";

export default class ArticlePreview extends Component<ArticleStructure> {
  constructor(private title: string, private id: string) {
    super();

    this.template = `
      <div>
          <a href="/articles/{{id}}">{{title}}</a>
      </div>
    `;

    this._state = {
      title: this.title,
      id: this.id,
    };

    this.fill();
  }
}
