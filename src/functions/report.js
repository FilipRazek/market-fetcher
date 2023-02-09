import express from "express";
import serverless from "serverless-http";
import { fetchDataset, getReferencesData, getReferencesName, getReportName } from "../helpers";

const app = express();
const router = express.Router();

router.get("/products", async (req, res) => {
  const { format } = req.query;
  if (!format || typeof format !== "string") {
    return res.status(400).send(JSON.stringify({ error: "Invalid format" }));
  }
  try {
    const report = await fetchDataset(format);
    res.attachment(getReportName(format));
    res.status(200).send(report);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/references", async (req, res) => {
  const { format } = req.query;
  if (!format || typeof format !== "string") {
    return res.status(400).send(JSON.stringify({ error: "Invalid format" }));
  }
  try {
    const report = await getReferencesData(format);
    res.attachment(getReferencesName(format));
    res.status(200).send(report);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.use("/.netlify/functions/report", router);

export const handler = serverless(app);
