import { uploadDataset } from "../apify-client.js";
import { PRODUCTS } from "../products-data.js";
import { fetchDataset, getProductData } from "../helpers.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const REFERENCES_DATASET_ID = process.env.REFERENCES_DATASET_ID;

export const updateReferences = async (req, res) => {
  const currentReferences = await fetchDataset(APIFY_TOKEN, REFERENCES_DATASET_ID, "json");
  const currentProducts = {};
  for (const { marketName, productId } of currentReferences) {
    if (!currentProducts[marketName]) {
      currentProducts[marketName] = [];
    }
    currentProducts[marketName].push(productId);
  }

  const results = [];
  for (const marketName of Object.keys(PRODUCTS)) {
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
        // eslint-disable-next-line no-console
        console.log(error.message, marketName, productId);
      }
    }
  }

  await uploadDataset(APIFY_TOKEN, REFERENCES_DATASET_ID, results);

  res.status(200).send("Success!");
};
