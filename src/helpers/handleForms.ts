export default (logic: Function) => {
  const forms = Array.from(document.getElementsByTagName("form"));
  if (forms) {
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        logic(form);
      });
    });
  }
};
