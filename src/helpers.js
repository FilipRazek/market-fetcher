import axios from "axios";
import { parse as parseHtml } from "node-html-parser";
import { parse as parseJson } from "json2csv";
import { extractFromDocument } from "./crawlers/extractors";
import { getDataset } from "./client";
import { PRODUCTS } from "./products";

export const fetchDataset = async (format) => {
  const data = await getDataset();
  switch (format) {
    case "csv":
      return parseJson(data);
    case "json":
      return data;
    default:
      throw new Error(`Invalid format: ${format}`);
  }
};

export const getReportName = (format) =>
  `report-products-${new Date().toISOString()}.${format}`;

export const getReferencesName = (format) =>
  `report-references-${new Date().toISOString()}.${format}`;

export const marketUrlBuilderMap = {
  TESCO: (productId) =>
    `https://nakup.itesco.cz/groceries/cs-CZ/products/${productId}`,
};

const buildUrl = (marketName, productId) =>
  marketUrlBuilderMap[marketName](productId);

export const getProductData = async (marketName, productId) => {
  const url = buildUrl(marketName, productId);
  const { data } = await axios.get(url);
  const document = parseHtml(data);

  return extractFromDocument(document, marketName);
};

const fetchReferencesData = async () => {
  const results = [];
  for (const marketName of Object.keys(PRODUCTS)) {
    for (const productId of PRODUCTS[marketName]) {
      const { price, pricePerUnit, image, title, unit } = await getProductData(
        marketName,
        productId
      );

      const quantity = price / pricePerUnit;
      try {
        results.push({
          marketName,
          productId,
          title,
          image,
          quantity,
          unit,
        });
      } catch (error) {
        console.log(error.message, marketName, productId);
      }
    }
  }
  return results;
};

export const getReferencesData = async (format) => {
  const data = await fetchReferencesData();
  switch (format) {
    case "csv":
      return parseJson(data);
    case "json":
      return data;
    default:
      throw new Error(`Invalid format: ${format}`);
  }
};
