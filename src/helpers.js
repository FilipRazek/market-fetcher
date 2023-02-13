import axios from "axios";
import { parse as parseHtml } from "node-html-parser";
import { parse as parseJson } from "json2csv";
import { extractFromDocument } from "./market-extractors.js";
import { getDataset } from "./apify-client.js";
import { BILLA_PRODUCTS } from "./products-data.js";

export const fetchDataset = async (apifyToken, datasetId, format) => {
  const data = await getDataset(apifyToken, datasetId);
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
  BILLA: (productId) =>
    `https://shop.billa.cz/produkt/${BILLA_PRODUCTS[productId]}`,
};

const buildUrl = (marketName, productId) =>
  marketUrlBuilderMap[marketName](productId);

export const getProductData = async (marketName, productId) => {
  const url = buildUrl(marketName, productId);
  console.log("Fetching", url);
  const { data } = await axios.get(url);
  const document = parseHtml(data);

  return extractFromDocument(document, marketName);
};
