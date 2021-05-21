export default interface Response {
  readonly root: HTMLElement;

  sendText(text: string, displayEl?: keyof HTMLElementTagNameMap): void;
  insert(markup: string, position: InsertPosition, clean?: boolean): void;
  render(htmlFile: `${string}.html`, position: InsertPosition): void;
  clean(): void;
}
