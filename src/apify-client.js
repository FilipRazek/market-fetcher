import axios from "axios";

const buildDatasetUrl = (datasetId) =>
  `https://api.apify.com/v2/datasets/${datasetId}/items`;

export const uploadDataset = (token, datasetId, data) => {
  const url = new URL(buildDatasetUrl(datasetId));
  url.searchParams.set("token", token);
  return axios.post(url.href, data);
};

export const getDataset = async (token, datasetId) => {
  const url = new URL(buildDatasetUrl(datasetId));
  url.searchParams.set("token", token);
  const { data } = await axios.get(url.href);
  return data;
};
