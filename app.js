const express = require("express");
const morgan = require("morgan");
const { productModel } = require("./DAOs/ProductManagerDaoFS");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
// No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

const { router: productRoutes } = require("./routes/product.routes");
app.use("/api/products", productRoutes);

const { router: cartRoutes } = require("./routes/cart.routes");
app.use("/api/carts", cartRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
