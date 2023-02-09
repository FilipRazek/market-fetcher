const tescoExtractor = {
  titleFn: (document) =>
    document
      .querySelector('h1[class*="product-details-tile__title"]')
      .textContent.trim(),
  pricePerUnitFn: (document) =>
    parseFloat(
      document
        .querySelector("div[class*=price-per-quantity]")
        .childNodes[0].querySelector(".value")
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
  unitFn: (document) =>
    document
      .querySelector("div[class*=price-per-quantity]")
      .childNodes[1].textContent.trim()
      .replace("/", ""),
  imageFn: (document) =>
    document.querySelector('img[class*="product-image"]').getAttribute("src"),
};

export const extractFromDocument = (document, extractorName) => {
  const extractorMap = { TESCO: tescoExtractor };

  const extractor = extractorMap[extractorName];
  const { titleFn, pricePerUnitFn, unitFn, imageFn, priceFn } = extractor;
  const title = titleFn(document);
  const price = priceFn(document);
  const pricePerUnit = pricePerUnitFn(document);
  const unit = unitFn(document);
  const image = imageFn(document);
  return { title, pricePerUnit, price, unit, image };
};
