import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const APIFY_TOKEN = process.env.APIFY_TOKEN;
export const PRODUCTS_DATASET_ID = process.env.PRODUCTS_DATASET_ID;
export const REFERENCES_DATASET_ID = process.env.REFERENCES_DATASET_ID;

const CREATE_DATASET_URL = "https://api.apify.com/v2/datasets";
const buildDatasetUrl = (datasetId) =>
  `https://api.apify.com/v2/datasets/${datasetId}/items`;

export const createDataset = () => {
  const url = new URL(CREATE_DATASET_URL);
  url.searchParams.set("token", APIFY_TOKEN);
  return axios.post(url.href);
};

export const uploadDataset = (datasetId, data) => {
  const url = new URL(buildDatasetUrl(datasetId));
  url.searchParams.set("token", APIFY_TOKEN);
  return axios.post(url.href, data);
};

export const getDataset = async (datasetId) => {
  const url = new URL(buildDatasetUrl(datasetId));
  url.searchParams.set("token", APIFY_TOKEN);
  const { data } = await axios.get(url.href);
  return data;
};
