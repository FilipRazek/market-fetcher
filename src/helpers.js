import { ApifyClient } from "apify-client";

// Fetch report from Apify dataset
export const fetchReport = async (format) => {
  const apifyClient = new ApifyClient({
    token: process.env.APIFY_TOKEN,
  });

  const datasetClient = apifyClient.dataset();
  const xlsx = await datasetClient.downloadItems("xlsx");
  return xlsx;
};
