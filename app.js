const express = require("express");
const morgan = require("morgan");
const { productModel } = require("./DAOs/ProductManagerDaoFS");

const app = express();
app.use(morgan("dev"));

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await productModel.getProducts();
  if (!limit) {
    res.json(products);
  } else if (Number(limit)) {
    res.json(products.slice(0, limit));
  } else {
    res.send("Query limit must be numeric");
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  if (Number(pid)) {
    const producto = await productModel.getProductById(Number(pid));
    res.json(producto);
  } else {
    res.send("Id must be numeric");
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
