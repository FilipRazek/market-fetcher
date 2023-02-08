import express from "express";
import serverless from "serverless-http";

const app = express();

const router = express.Router();

const generateReport = (format) => {
  return "example data";
};

router.get("/", (req, res) => {
  const { format } = req.query;
  console.log(format);
  if (!format || typeof format !== "string") {
    return res.status(400).send("Invalid format");
  }
  const report = generateReport(format);
  res.send({ data: report });
});

app.use("/.netlify/functions/report", router);

export const handler = serverless(app);
