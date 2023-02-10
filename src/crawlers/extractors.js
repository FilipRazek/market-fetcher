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
  categoryFn: (document) =>
    [...document.querySelectorAll(".beans-breadcrumb__list-item")]
      .slice(1, -1)
      .map((listItem) =>
        listItem.querySelector(".beans-link__text").textContent.trim()
      )
      .join("/"),
};

export const extractFromDocument = (document, extractorName) => {
  const extractorMap = { TESCO: tescoExtractor };

  const extractor = extractorMap[extractorName];
  const { titleFn, pricePerUnitFn, unitFn, imageFn, priceFn, categoryFn } =
    extractor;
  const title = titleFn(document);
  const price = priceFn(document);
  const pricePerUnit = pricePerUnitFn(document);
  const unit = unitFn(document);
  const image = imageFn(document);
  const category = categoryFn(document);
  return { title, pricePerUnit, price, unit, image, category };
};
