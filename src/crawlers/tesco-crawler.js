export const tescoCrawler = {
  startUrl: "https://nakup.itesco.cz/",
  linkSelector: 'a[href*="nakup.itesco.cz/groceries/en-GB/products/"]',
  selector: "/products/",
  titleFn: ($) => $("h1[class=product-details-tile__title]").text().trim(),
  priceFn: ($) => $('span[class="data-auto="price-value"').text().trim(),
  descriptionFn: ($) => $('div[class*="Text_body"]').text().trim(),
  imageFn: ($) => $('img[class="product-image"]').attr("src"),
};
