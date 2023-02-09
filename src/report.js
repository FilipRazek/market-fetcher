import express from "express";
import serverless from "serverless-http";
import { fetchReport } from "./helpers";

const app = express();

const router = express.Router();

router.get("/", async (req, res) => {
  const { format } = req.query;
  if (!format || typeof format !== "string") {
    return res.status(400).send(JSON.stringify({ error: "Invalid format" }));
  }
  const report = await fetchReport(format);
  res.download(report, `report.${format}`, (err) => {
    console.log(err);
  });
});

app.use("/.netlify/functions/report", router);

export const handler = serverless(app);
