import { fetchDataset, getReportName } from "../helpers.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const PRODUCTS_DATASET_ID = process.env.PRODUCTS_DATASET_ID;

export const getProducts = async (req, res) => {
  const { format } = req.query;
  if (!format || typeof format !== "string") {
    return res.status(400).send(JSON.stringify({ error: "Invalid format" }));
  }
  try {
    const report = await fetchDataset(APIFY_TOKEN, PRODUCTS_DATASET_ID, format);
    res.attachment(getReportName(format));
    res.status(200).send(report);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
