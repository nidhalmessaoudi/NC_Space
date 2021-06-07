import Component from "../Core/Component";
import ErrorModel from "../../models/Error.model";

export default class Error extends Component<ErrorModel> {
  constructor(private message: string) {
    super();

    this.template = `
            <div id="${this.componentId}" style="color: red;">
                <b>{{message}}</b>
            </div>
        `;

    this._state = {
      message: this.message,
    };

    this.fill();
  }
}
