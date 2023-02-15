import axios from "axios";

const buildDatasetUrl = (datasetId: string) =>
  `https://api.apify.com/v2/datasets/${datasetId}/items`;

export const uploadDataset = (
  token: string,
  datasetId: string,
  data: object
) => {
  const url = new URL(buildDatasetUrl(datasetId));
  url.searchParams.set("token", token);
  return axios.post(url.href, data);
};

export const getDataset = async (token: string, datasetId: string) => {
  const url = new URL(buildDatasetUrl(datasetId));
  url.searchParams.set("token", token);
  const { data } = await axios.get<unknown, { data: object[] }>(url.href);
  return data;
};
