import express from "express";
import { getProducts } from "./api/get-products.js";
import { getReferences } from "./api/get-references.js";
import { updateDatabase } from "./api/update-database.js";
import { updateReferences } from "./api/update-references.js";

// Access the PORT environment variable set by Heroku, or use 8080 locally
const PORT = process.env.PORT || 8080;

const app = express();

app.use("/", express.static("public"));
app.get("/products", getProducts);
app.get("/references", getReferences);
app.get("/update-references", updateReferences);
app.get("/update-database", updateDatabase);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
