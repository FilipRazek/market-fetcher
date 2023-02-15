import { parse } from "json2csv";
import { getDataset } from "./apify-client.js";
import { BILLA_PRODUCTS, Market } from "./hooks/products-data.js";

export const fetchDataset = async (
  apifyToken: string,
  datasetId: string,
  format: string
) => {
  const data = await getDataset(apifyToken, datasetId);
  switch (format) {
    case "csv":
      return parse(data);
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

const marketUrlBuilderMap = {
  TESCO: (productId: number) =>
    `https://nakup.itesco.cz/groceries/cs-CZ/products/${productId}`,
  BILLA: (productId: number) =>
    `https://shop.billa.cz/produkt/${BILLA_PRODUCTS[productId]}`,
};

export const buildUrl = (marketName: Market, productId: number) =>
  marketUrlBuilderMap[marketName](productId);
