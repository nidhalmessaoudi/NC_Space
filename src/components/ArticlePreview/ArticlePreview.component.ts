import ArticleStructure from "../../helpers/Article";
import Component from "../core/Component";

export default class ArticlePreview extends Component {
  private initialMarkup = `
    <div>
        <a href="/articles/{{id}}">{{title}}</a>
    </div>
  `;
  private _state: ArticleStructure;
  private fullMarkup: string;

  constructor(private title: string, private id: string) {
    super();
    this._state = {
      title: this.title,
      id: this.id,
    };
    this.fullMarkup = this.getLayout(this.initialMarkup, this._state);
  }

  get state() {
    return this._state;
  }

  get markup() {
    return this.fullMarkup;
  }
}
