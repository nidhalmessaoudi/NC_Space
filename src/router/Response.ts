export default interface Response {
  readonly root: HTMLDivElement;

  sendText(text: string, displayEl?: keyof HTMLElementTagNameMap): void;
  insert(markup: string, position: InsertPosition, clean?: boolean): void;
  render(htmlFile: `${string}.html`, position: InsertPosition): void;
  setTitle(title: string): void;
  clean(): void;
}
