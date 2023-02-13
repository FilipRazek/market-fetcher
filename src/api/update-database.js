import { uploadDataset } from "../apify-client.js";
import { PRODUCTS } from "../products-data.js";
import { getProductData } from "../helpers.js";

const PRODUCTS_DATASET_ID = process.env.PRODUCTS_DATASET_ID;
const APIFY_TOKEN = process.env.APIFY_TOKEN;

export const updateDatabase = async (req, res) => {
  const results = [];
  for (const marketName of Object.keys(PRODUCTS)) {
    for (const productId of PRODUCTS[marketName]) {
      try {
        const { pricePerUnit } = await getProductData(marketName, productId);
        results.push({
          marketName,
          productId,
          date: new Date().toISOString(),
          pricePerUnit,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message, marketName, productId);
      }
    }
  }

  await uploadDataset(APIFY_TOKEN, PRODUCTS_DATASET_ID, results);

  res.status(200).send("Success!");
};
