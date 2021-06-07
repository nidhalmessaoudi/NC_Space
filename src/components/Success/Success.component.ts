import Component from "../Core/Component";
import SuccessModel from "../../models/Success.model";

export default class Success extends Component<SuccessModel> {
  constructor(private message: string) {
    super();

    this.template = `
            <div id="${this.componentId}" style="color: green;">
                <b>{{message}}</b>
            </div>
        `;

    this._state = {
      message: this.message,
    };

    this.fill();
  }
}
