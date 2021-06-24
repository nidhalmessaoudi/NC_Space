import ObjIndex from "../../helpers/ObjectIndex";
import Component from "../Core/Component";

export default class CommentsContainer extends Component<ObjIndex> {
  constructor(private comment: string) {
    super();

    this.template = this._markup = `
      <div id="${this.componentId}">
        <h4>All Comments</h4>
        <form id="comment-form">
          <textarea
           id="comment-input"
           cols="30"
           rows="15"
           placeholder="Write your comment here..."
          ></textarea>
          <button id="add-comment">{{commentAction}}</button>
        </form>
      </div>
    `;

    this._state = { commentAction: this.comment };

    this.fill();
  }
}
