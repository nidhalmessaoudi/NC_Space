import Component from "../core/Component";
import ArticleStructure from "../../models/Article.model";

export default class Article extends Component<ArticleStructure> {
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

    this.template = `<div id="article-temp">
      <h3>{{title}}</h3>
      <p>{{createdAt}} • {{views}} person read this article</p>
      <img src="{{coverImage}}">
      <p><em>{{summary}}</em></p>
      <p>{{body}}</p>
    </div>
    `;

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

    this.fill();
  }
}
