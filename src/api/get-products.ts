import { Request, Response } from "express";
import { fetchDataset, getReportName } from "../helpers.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const PRODUCTS_DATASET_ID = process.env.PRODUCTS_DATASET_ID;

export const getProducts = async (req: Request, res: Response) => {
  const { format } = req.query;
  if (!format || typeof format !== "string") {
    res.status(400).send(JSON.stringify({ error: "Invalid format" }));
  } else {
    try {
      const report = await fetchDataset(
        APIFY_TOKEN,
        PRODUCTS_DATASET_ID,
        format
      );
      res.attachment(getReportName(format));
      res.status(200).send(report);
    } catch (error) {
      const { message } = error as { message: string };
      res.status(400).send({ error: message });
    }
  }
};
