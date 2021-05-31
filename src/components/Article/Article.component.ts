/**
@note 
The code inside this file will be refactored! (Just for test)
*/

interface Output {
  title: string;
  createdAt: string;
  views: number;
  coverImage: string;
  summary: string;
  body: string;
}

export default class Article {
  private initialMarkup = `
  <div>
    <h3>{{title}}</h3>
    <p>{{createdAt}} • {{views}} person read this article</p>
    <img src="{{coverImage}}">
    <p><em>{{summary}}</em></p>
    <p>{{body}}</p>
  </div>
  `;
  private _state: Output;
  private fullMarkup: string;

  constructor(
    private title: string,
    private createdAt: string,
    private views: number,
    private coverImage: string,
    private summary: string,
    private body: string
  ) {
    this._state = {
      title: this.title,
      createdAt: this.createdAt,
      views: this.views,
      coverImage: this.coverImage,
      summary: this.summary,
      body: this.body,
    };

    const keyValues = this.initialMarkup
      .split("{{")
      .filter((e: string) => e.includes("}}"))
      .map((el: string) => el.split("}}")[0]);

    let fullfilledMarkup = this.initialMarkup;
    keyValues.forEach((el: string) => {
      if (!this._state[el as keyof Output]) return;
      const currentData = String(this._state[el as keyof Output]);
      fullfilledMarkup = fullfilledMarkup.replace(`{{${el}}}`, currentData);
    });
    this.fullMarkup = fullfilledMarkup;
  }

  get state() {
    return this._state;
  }

  get markup() {
    return this.fullMarkup;
  }
}
