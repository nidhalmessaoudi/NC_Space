import ObjIndex from "../../helpers/ObjectIndex";
import Component from "../Core/Component";

export default class LikesContainer extends Component<ObjIndex> {
  constructor() {
    super();

    this.template = this._markup = `
      <div 
        id="${this.componentId}"
        class="likes-container"
        style="display: none" 
        data-state="invisible">
        <h4>Who like this article</h4>
      </div>
    `;
  }
}
