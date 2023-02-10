import { uploadDataset } from "../client";
import { PRODUCTS } from "../products";
import { getProductData } from "../helpers";

export const handler = async () => {
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

  await uploadDataset(results);

  return {
    statusCode: 200,
    body: "Success!",
  };
};
