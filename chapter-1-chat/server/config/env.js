export default (env = "") => {
  if (env === "development") {
    return {
      db: {
        url: "localhost:27017",
        name: "chatdb",
      },
    };
  }
  throw new Error(`unknown env called ${env} passed.`);
};
