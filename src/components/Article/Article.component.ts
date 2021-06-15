import Component from "../Core/Component";
import ArticleModel from "../../models/Article.model";

export default class Article extends Component<ArticleModel> {
  constructor(
    private title: string,
    private slug: string,
    private category: string,
    private createdAt: Date,
    private views: number,
    private coverImage: string,
    private summary: string,
    private body: string,
    private tags: string,
    private numberOfLikes: number,
    private numberOfComments: number
  ) {
    super();

    this.template = `
      <div id="${this.componentId}">
        <h3>{{title}}</h3>
        <p>{{createdAt}} • {{views}} person read this article</p>
        <img src="{{coverImage}}">
        <p><em>{{summary}}</em></p>
        <p>{{body}}</p>
        <div id="user-reaction">
          <p style="cursor: pointer" class="article-likes">{{numberOfLikes}} likes</p>
          <button id="like-btn">Give a like</button>
          <p>{{numberOfComments}} comments</p>
        </div>
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
      numberOfLikes: this.numberOfLikes,
      numberOfComments: this.numberOfComments,
    };

    this.fill();
  }
}
