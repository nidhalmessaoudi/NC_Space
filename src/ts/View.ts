class View {
  constructor(
    private root: HTMLDivElement,
    private path: `/${string}`,
    private markup: string
  ) {
    if (location.pathname === this.path) {
      this.clean();
      this.render("beforeend");
    }

    window.addEventListener("popstate", this.popStateHandler.bind(this));
  }

  render(place: InsertPosition, markup: string = this.markup) {
    this.root.insertAdjacentHTML(place, markup);
  }

  clean() {
    this.root.innerHTML = "";
  }

  goTolink() {
    history.pushState({}, this.path, `${location.origin}${this.path}`);
    this.clean();
    this.render("beforeend");
  }

  popStateHandler() {
    if (location.pathname !== this.path) return;
    this.clean();
    this.render("beforeend");
  }
}

export default View;
