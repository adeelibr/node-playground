import env from "./env.js";

const currentEnv = process.env["NODE_ENV"] || "development";
console.log(`Current environment is ${currentEnv}`);

export default {
  currentEnv,
  ...env(currentEnv)
};
