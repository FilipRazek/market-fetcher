const tescoExtractor = {
  titleFn: (document) =>
    document
      .querySelector('h1[class*="product-details-tile__title"]')
      .textContent.trim(),
  priceFn: (document) =>
    document.querySelector('span[class*="value"]').textContent.trim(),
  imageFn: (document) =>
    document.querySelector('img[class*="product-image"]').getAttribute("src"),
};

export const extractFromTescoDocument = (document) => {
  const { titleFn, priceFn, imageFn } = tescoExtractor;
  const title = titleFn(document);
  const price = priceFn(document);
  const image = imageFn(document);
  return { title, price, image };
};
