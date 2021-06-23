import Component from "../Core/Component";
import ObjIndex from "src/helpers/ObjectIndex";

export default class SocialLogin extends Component<ObjIndex> {
  constructor(private googleUrl: string, private fbUrl: string) {
    super();

    this.template = `
        <div id="${this.componentId}">
            <h3>OR</h3>
            <div>
                <a href="{{googleUrl}}">Continue with Google</a>
            </div>
            <div>
                <a href="{{fbUrl}}">Continue with Facebook</a>
            </div>
        </div>
    `;

    this._state = {
      googleUrl: this.googleUrl,
      fbUrl: this.fbUrl,
    };

    this.fill();
  }
}
