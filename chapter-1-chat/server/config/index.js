var debug = require("debug")("chapter-1-chat:server");

import env from "./env";

debug(`Current environment is ${process.env["NODE_ENV"] || "development"}`);
