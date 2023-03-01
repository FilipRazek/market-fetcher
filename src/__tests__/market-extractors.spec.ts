import parse from "node-html-parser";
import { tescoExtractor, billaExtractor } from "../hooks/market-extractors.js";
import billaProductHtml from "./assets/billa-product-82329695.js";
import tescoProductHtml from "./assets/tesco-product-2001014250175.js";

describe("Market Extractors", () => {
  describe("Tesco extractor", () => {
    const document = parse(tescoProductHtml);
    it("should extract title", () => {
      const title = tescoExtractor.titleFn(document);
      expect(title).toBe(
        "Lindt Excellence Hořká čokoláda s pomerančovými kousky a s kousky mandlí 100g"
      );
    });
    it("should extract image", () => {
      const image = tescoExtractor.imageFn(document);
      expect(image).toBe(
        "https://secure.ce-tescoassets.com/assets/CZ/370/3046920028370/ShotType1_540x540.jpg"
      );
    });
    it("should extract category", () => {
      const category = tescoExtractor.categoryFn(document);
      expect(category).toBe(
        "Trvanlivé potraviny/Sladkosti a cukrovinky/Tabulkové čokolády"
      );
    });
    it("should extract unit", () => {
      const unit = tescoExtractor.unitFn(document);
      expect(unit).toBe("kg");
    });
    it("should extract price", () => {
      const price = tescoExtractor.priceFn(document);
      expect(price).toBe(79.9);
    });
    it("should extract unit price", () => {
      const unitPrice = tescoExtractor.pricePerUnitFn(document);
      expect(unitPrice).toBe(799);
    });
    it("should extract unit loyalty price", () => {
      const loyaltyPricePerUnit =
        tescoExtractor.loyaltyPriceFn(document);
      expect(loyaltyPricePerUnit).toBe(52.9);
    });
  });

  describe("Billa extractor", () => {
    const document = parse(billaProductHtml);
    it("should extract title", () => {
      const title = billaExtractor.titleFn(document);
      expect(title).toBe("Bon Via Paprika červená");
    });
    it("should extract price", () => {
      const price = billaExtractor.priceFn(document);
      expect(price).toBe(35.62);
    });
    it("should extract image", () => {
      const image = billaExtractor.imageFn(document);
      expect(image).toBe(
        "https://485f9ee3694ded7abe0d-a886876b9b0b503055a7abcb3cc936d9.ssl.cf3.rackcdn.com/82-329695-45971532-x75CSXl8-medium.jpg"
      );
    });
    it("should extract category", () => {
      const category = billaExtractor.categoryFn(document);
      expect(category).toBe("Ovoce a zelenina/Zelenina/Papriky");
    });
    it("should extract unit", () => {
      const unit = billaExtractor.unitFn(document);
      expect(unit).toBe("kg");
    });
    it("should extract unit price", () => {
      const unitPrice = billaExtractor.pricePerUnitFn(document);
      expect(unitPrice).toBe(114.90);
    });
  });
});
