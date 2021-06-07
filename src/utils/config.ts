export default {
  MODE: "development",
  MAIN_API: process.env.NC_SPACE_API,
  ROOT: document.getElementById("root")! as HTMLDivElement,
  FETCH_TIMEOUT: 10,
};
