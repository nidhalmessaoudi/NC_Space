export default {
  MODE: "development",
  hostname: "localhost",
  MAIN_API: process.env.NC_SPACE_API,
  ROOT: document.getElementById("root")! as HTMLDivElement,
  FETCH_TIMEOUT: 10,
};
