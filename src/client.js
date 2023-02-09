import axios from "axios";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const DATASET_ID = process.env.DATASET_ID;

const CREATE_DATASET_URL = "https://api.apify.com/v2/datasets";
const INDIVIDUAL_DATASET_URL = `https://api.apify.com/v2/datasets/${DATASET_ID}/items`;

export const createDataset = () => {
  const url = new URL(CREATE_DATASET_URL);
  url.searchParams.set("token", APIFY_TOKEN);
  return axios.post(url.href);
};

export const uploadDataset = (data) => {
  const url = new URL(INDIVIDUAL_DATASET_URL);
  url.searchParams.set("token", APIFY_TOKEN);
  return axios.post(url.href, data);
};

export const getDataset = async () => {
  const url = new URL(INDIVIDUAL_DATASET_URL);
  url.searchParams.set("token", APIFY_TOKEN);
  const { data } = await axios.get(url.href);
  return data;
};
