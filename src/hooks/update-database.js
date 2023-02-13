import { uploadDataset } from "../apify-client.js";
import { PRODUCTS } from "../products-data.js";
import { getProductData } from "../helpers.js";

const PRODUCTS_DATASET_ID = process.env.PRODUCTS_DATASET_ID;
const APIFY_TOKEN = process.env.APIFY_TOKEN;

export const updateDatabase = async () => {
  console.log("Updating database");
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
        console.log(error.message, marketName, productId);
      }
    }
  }
  await uploadDataset(APIFY_TOKEN, PRODUCTS_DATASET_ID, results);
};

await updateDatabase();
