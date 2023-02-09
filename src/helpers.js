import { getDataset, uploadDataset } from "./client";
import { parse } from "json2csv";

export const fetchDataset = async (format) => {
  const data = await getDataset();
  switch (format) {
    case "csv":
      return parse(data);
    case "json":
      return data;
    default:
      throw new Error(`Invalid format: ${format}`);
  }
};

export const getReportName = (format) =>
  `report-${new Date().toISOString()}.${format}`;
