const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

// Root path
router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/.netlify/functions/api", router);

module.exports = app;
module.exports.handler = serverless(app);
