import express from "express";
import { getProducts } from "./api/get-products.js";
import { getReferences } from "./api/get-references.js";

// Access the PORT environment variable set by hosting site, or use 8080 locally
const PORT = process.env.PORT || 8080;

const app = express();

app.use("/", express.static("public"));
app.get("/products", getProducts);
app.get("/references", getReferences);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
