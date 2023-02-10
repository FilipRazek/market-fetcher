import { REFERENCES_DATASET_ID, uploadDataset } from "../client";
import { PRODUCTS } from "../products";
import { getProductData } from "../helpers";

export const handler = async () => {
  const results = [];
  for (const marketName of Object.keys(PRODUCTS)) {
    for (const productId of PRODUCTS[marketName]) {
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
        console.log(error.message, marketName, productId);
      }
    }
  }

  await uploadDataset(REFERENCES_DATASET_ID, results);

  return {
    statusCode: 200,
    body: "Success!",
  };
};
