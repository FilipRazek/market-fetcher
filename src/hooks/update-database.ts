import { uploadDataset } from "../apify-client.js";
import { getProductData } from "./market-extractors.js";
import { Market, PRODUCTS } from "./products-data.js";

const PRODUCTS_DATASET_ID = process.env.PRODUCTS_DATASET_ID;
const APIFY_TOKEN = process.env.APIFY_TOKEN;

export const fetchProducts = async () => {
  console.log("Updating database");
  const results = [];
  for (const marketName of Object.keys(PRODUCTS) as Market[]) {
    for (const productId of PRODUCTS[marketName]) {
      try {
        const { pricePerUnit, loyaltyPricePerUnit } = await getProductData(
          marketName,
          productId
        );
        results.push({
          marketName,
          productId,
          date: new Date().toISOString(),
          pricePerUnit,
          loyaltyPricePerUnit,
        });
      } catch (error) {
        const { message } = error as { message: string };
        console.log(message, marketName, productId);
      }
    }
  }
  return results;
};

const results = await fetchProducts();
await uploadDataset(APIFY_TOKEN, PRODUCTS_DATASET_ID, results);
