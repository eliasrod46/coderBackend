// importo modulo express
const express = require("express");

// importo e instancio la clase Producto
const ProductManager = require("./DAOs/ProductManagerDaoFS");
//--> el contructor requiere ubicacion de archivo
const productModel = new ProductManager("./productos.json");

// --> creo servidor
const app = express();

// --> middlewares
app.use(express.urlencoded({ extended: true }));

// --> rutas
app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await productModel.getProducts();
  if (!limit) {
    res.json(products);
  } else if (Number(limit)) {
    res.json(products.slice(0, limit));
  } else {
    res.send("la querry limit debe ser numerica");
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  if (Number(pid)) {
    const producto = await productModel.getProductById(Number(pid));

    res.json(producto);
  } else {
    res.send("el id debe ser numerico");
  }
});

// --> levanto servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando: http://localhost:${PORT}/`);
});
