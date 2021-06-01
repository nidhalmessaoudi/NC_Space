import Component from "../core/Component";
import ArticleStructure from "../../helpers/Article";

export default class Article extends Component {
  private initialMarkup = `
  <div>
    <h3>{{title}}</h3>
    <p>{{createdAt}} • {{views}} person read this article</p>
    <img src="{{coverImage}}">
    <p><em>{{summary}}</em></p>
    <p>{{body}}</p>
  </div>
  `;
  private _state: ArticleStructure;
  private fullMarkup: string;

  constructor(
    private title: string,
    private slug: string,
    private category: string,
    private createdAt: string,
    private views: number,
    private coverImage: string,
    private summary: string,
    private body: string,
    private tags: string
  ) {
    super();
    this._state = {
      title: this.title,
      slug: this.slug,
      category: this.category,
      createdAt: this.createdAt,
      views: this.views,
      coverImage: this.coverImage,
      summary: this.summary,
      body: this.body,
      tags: this.tags,
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
