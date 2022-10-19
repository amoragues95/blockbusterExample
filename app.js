const express = require("express");
const router = require("./router");
require("dotenv").config();
const app = express();
const port = 3000;
app.use("/", router);
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = {
  app,
  server,
};
