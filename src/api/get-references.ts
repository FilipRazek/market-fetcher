import { Request, Response } from "express";
import { fetchDataset, getReferencesName } from "../helpers.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const REFERENCES_DATASET_ID = process.env.REFERENCES_DATASET_ID;

export const getReferences = async (req: Request, res: Response) => {
  const { format } = req.query;
  if (!format || typeof format !== "string") {
    return res.status(400).send(JSON.stringify({ error: "Invalid format" }));
  }
  try {
    const report = await fetchDataset(
      APIFY_TOKEN,
      REFERENCES_DATASET_ID,
      format
    );
    res.attachment(getReferencesName(format));
    res.status(200).send(report);
  } catch (error) {
    const { message } = error as { message: string };
    res.status(400).send({ error: message });
  }
};
