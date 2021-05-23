import Router from "./Router";
import route from "../routes/main";

const capturedEls: HTMLElement[] = [];

const navigate = (links: HTMLAnchorElement[]) => {
  if (!links.length) return;

  const parentEls = links.map((link) => link.parentElement);
  parentEls?.forEach((parentEl) => {
    if (!parentEl) return;
    if (capturedEls.includes(parentEl)) return;

    capturedEls.push(parentEl);
    parentEl?.addEventListener("click", (e) => {
      e.preventDefault();
      const clicked = e.target as HTMLAnchorElement;
      if (clicked?.tagName !== "A") return;

      Router.pushState(clicked.pathname);
      route();
    });
  });
};

export default new MutationObserver((mutationsList: MutationRecord[]) => {
  mutationsList.forEach((mutation) => {
    if (!mutation.addedNodes.length) return;
    const links = Array.from(document.getElementsByTagName("a"));
    navigate(links);
  });
});
