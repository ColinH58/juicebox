// api/index.js
const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

// const tagsRouter = require("./tags");
// apiRouter.use("/tags", tagsRouter);

module.exports = apiRouter;
