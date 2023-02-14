import axios from "axios";
import { parse as parseHtml } from "node-html-parser";
import { parse as parseJson } from "json2csv";
import { extractFromDocument } from "./market-extractors";
import { getDataset } from "../apify-client";
import { BILLA_PRODUCTS, Market } from "./products-data";

export const fetchDataset = async (
  apifyToken: string,
  datasetId: string,
  format: string
) => {
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

export const getReportName = (format: string) =>
  `report-products-${new Date().toISOString()}.${format}`;

export const getReferencesName = (format: string) =>
  `report-references-${new Date().toISOString()}.${format}`;

export const marketUrlBuilderMap = {
  TESCO: (productId: number) =>
    `https://nakup.itesco.cz/groceries/cs-CZ/products/${productId}`,
  BILLA: (productId: number) =>
    `https://shop.billa.cz/produkt/${BILLA_PRODUCTS[productId]}`,
};

const buildUrl = (marketName: Market, productId: number) =>
  marketUrlBuilderMap[marketName](productId);

export const getProductData = async (marketName: Market, productId: number) => {
  const url = buildUrl(marketName, productId);
  console.log("Fetching", url);
  const { data } = await axios.get(url);
  const document = parseHtml(data);

  return extractFromDocument(document, marketName);
};
