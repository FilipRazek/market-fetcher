import axios from "axios";
import { parse } from "node-html-parser";

import { extractFromTescoDocument } from "../crawlers/tesco-extractor";
import { uploadDataset } from "../client";

export const handler = async () => {
  const URLS = [
    "https://nakup.itesco.cz/groceries/cs-CZ/products/2001012691222",
    "https://nakup.itesco.cz/groceries/cs-CZ/products/2001014250175",
  ];
  const results = [];
  for (const url of URLS) {
    try {
      const { data } = await axios.get(url);
      const document = parse(data);

      results.push({
        ...extractFromTescoDocument(document),
        "#url": url,
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.log(error.message, url);
    }
  }

  await uploadDataset(results);

  return {
    statusCode: 200,
    body: "Success!",
  };
};
