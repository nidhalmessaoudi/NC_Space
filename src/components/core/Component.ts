import Article from "../../helpers/Article";

export default class Component {
  getLayout<T extends Article>(initialMarkup: string, state: T) {
    const keyValues = initialMarkup
      .split("{{")
      .filter((e: string) => e.includes("}}"))
      .map((el: string) => el.split("}}")[0]);

    let fullLayout = initialMarkup;
    keyValues.forEach((el: string) => {
      if (!state[el]) return;
      const currentData = String(state[el]);
      fullLayout = fullLayout.replace(`{{${el}}}`, currentData);
    });
    return fullLayout;
  }
}
