import { getDataset, uploadDataset } from "../apify-client.js";
import { getProductData } from "./market-extractors.js";
import { Market, PRODUCTS } from "./products-data.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const REFERENCES_DATASET_ID = process.env.REFERENCES_DATASET_ID;

const fetchReferences = async (
  apifyToken: string,
  referencesDatasetId: string
) => {
  console.log("Updating references");
  const currentReferences = await getDataset(apifyToken, referencesDatasetId);
  const currentProducts: Record<string, number[]> = {};
  for (const { marketName, productId } of currentReferences as {
    marketName: Market;
    productId: number;
  }[]) {
    if (!currentProducts[marketName]) {
      currentProducts[marketName] = [];
    }
    currentProducts[marketName].push(productId);
  }

  const results = [];
  for (const marketName of Object.keys(PRODUCTS) as Market[]) {
    for (const productId of PRODUCTS[marketName]) {
      if (currentProducts[marketName]?.includes(productId)) continue;
      try {
        const { price, pricePerUnit, image, title, unit, category } =
          await getProductData(marketName, productId);
        const quantity = price / pricePerUnit;

        results.push({
          marketName,
          productId,
          title,
          category,
          image,
          quantity,
          unit,
        });
      } catch (error) {
        console.log(
          (error as { message: string }).message,
          marketName,
          productId
        );
      }
    }
  }
  return results;
};

const results = await fetchReferences(APIFY_TOKEN, REFERENCES_DATASET_ID);
await uploadDataset(APIFY_TOKEN, REFERENCES_DATASET_ID, results);
