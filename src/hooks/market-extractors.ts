import axios from "axios";
import { parse } from "node-html-parser";
import { buildUrl } from "../helpers.js";
import { Market } from "./products-data.js";

type Document = ReturnType<typeof parse>;

type Extractor = {
  titleFn: (document: Document) => string;
  pricePerUnitFn: (document: Document) => number;
  priceFn: (document: Document) => number;
  loyaltyPricePerUnitFn: (document: Document) => number | undefined;
  unitFn: (document: Document) => string;
  imageFn: (document: Document) => string;
  categoryFn: (document: Document) => string;
};

export const extractFromDocument = (
  document: Document,
  extractorName: Market
) => {
  const extractorMap = { TESCO: tescoExtractor, BILLA: billaExtractor };

  const extractor = extractorMap[extractorName];
  const {
    titleFn,
    pricePerUnitFn,
    unitFn,
    imageFn,
    priceFn,
    categoryFn,
    loyaltyPricePerUnitFn,
  } = extractor;
  const title = titleFn(document);
  const price = priceFn(document);
  const pricePerUnit = pricePerUnitFn(document);
  const unit = unitFn(document);
  const image = imageFn(document);
  const category = categoryFn(document);
  const loyaltyPricePerUnit = loyaltyPricePerUnitFn(document);
  return {
    title,
    pricePerUnit,
    price,
    unit,
    image,
    category,
    loyaltyPricePerUnit,
  };
};

const tescoExtractor: Extractor = {
  titleFn: (document) =>
    document
      .querySelector('h1[class*="product-details-tile__title"]')
      .textContent.trim(),
  pricePerUnitFn: (document) =>
    parseFloat(
      document
        .querySelector("div[class*=price-per-quantity] span.value")
        .textContent.trim()
        .replace(",", ".")
    ),
  priceFn: (document) =>
    parseFloat(
      document
        .querySelector("div[class~=price-per-sellable-unit]")
        .querySelector(".value")
        .textContent.trim()
        .replace(",", ".")
    ),
  loyaltyPricePerUnitFn: (document) => {
    const offerTextSpan = document.querySelector("span.offer-text");
    return offerTextSpan
      ? parseFloat(
          offerTextSpan.textContent
            .trim()
            .match(/S Clubcard (\d+(\.\d+))? Kč/)[1]
        )
      : undefined;
  },
  unitFn: (document) =>
    document
      .querySelector("div[class*=price-per-quantity]")
      .childNodes[1].textContent.trim()
      .replace("/", ""),
  imageFn: (document) =>
    document.querySelector('img[class*="product-image"]').getAttribute("src"),
  categoryFn: (document) =>
    [...document.querySelectorAll(".beans-breadcrumb__list-item")]
      .slice(1, -1)
      .map((listItem) =>
        listItem.querySelector(".beans-link__text").textContent.trim()
      )
      .join("/"),
};

const billaExtractor: Extractor = {
  titleFn: (document) =>
    document.querySelector('h1[data-test*="product-title"]').textContent.trim(),
  pricePerUnitFn: (document) =>
    parseFloat(
      document
        .querySelector("div[data-test*=product-price-type]")
        .querySelector(".caption")
        .textContent.match(/\d+,\d{2}/)[0]
        .replace(",", ".")
    ),
  priceFn: (document) =>
    parseFloat(
      document
        .querySelector("div[data-test*=product-price-type]")
        .querySelector("div.ws-product-price-type__value")
        .textContent.match(/\d+,\d{2}/)[0]
        .replace(",", ".")
    ),
  loyaltyPricePerUnitFn: () => undefined,
  unitFn: (document) =>
    document
      .querySelector("div[data-test*=product-price-type]")
      .querySelector(".caption")
      .textContent.match(/1 (kg|l|ks)/)[1],
  imageFn: (document) =>
    document.querySelector('img[class*="product-image"]').getAttribute("src"),
  categoryFn: (document) =>
    (
      JSON.parse(
        document.querySelector("script[data-hid*=schema-breadcrumbs]")
          .textContent
      ) as { itemListElement: { name: string }[] }
    ).itemListElement
      .slice(0, -1)
      .map((item) => item.name)
      .join("/"),
};

export const getProductData = async (marketName: Market, productId: number) => {
  const url = buildUrl(marketName, productId);
  console.log("Fetching", url);
  const { data } = await axios.get<unknown, { data: string }>(url);
  const document = parse(data);

  return extractFromDocument(document, marketName);
};
