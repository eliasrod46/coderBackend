const { productModel } = require("../DAOs/ProductManagerDaoFS");

const Router = require("express");

const router = Router();

// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productModel.getProducts();
    if (!limit) {
      res.status(200).json(products);
    } else if (Number(limit)) {
      res.status(200).json(products.slice(0, limit));
    } else {
      res.send("Query limit must be numeric");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    if (Number(pid)) {
      const producto = await productModel.getProductById(Number(pid));
      res.status(200).json(producto);
    } else {
      res.status(400).send("Id must be numeric");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    if (Number(pid)) {
      const response = await productModel.deleteProduct(Number(pid));
      res.status(200).json({ message: response });
    } else {
      res.status(400).json(["Id must be numeric"]);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// - id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
// - title:String,
// - description:String
// - code:String
// - price:Number
// - status:Boolean
// - stock:Number
// - category:String
// - thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
// - - Status es true por defecto.
// - - Todos los campos son obligatorios, a excepción de thumbnails

router.post("/", async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail = [],
    code,
    stock,
    category,
  } = req.body;

  // Validations
  if (!title) return res.status(400).json(["title can't be empty"]);
  if (!description) return res.status(400).json(["description can't be empty"]);
  if (!Number(price)) return res.status(400).json(["price must be numeric"]);
  if (!Array(thumbnail))
    return res.status(400).json(["thumbnail must be an array"]);
  if (!code) return res.status(400).json(["code can't be empty"]);
  if (!Number(stock)) return res.status(400).json(["stock must be numeric"]);
  if (!category) return res.status(400).json(["category can't be empty"]);

  try {
    const response = await productModel.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
router.put("/:pid", async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail = [],
    code,
    stock,
    category,
  } = req.body;
  const { pid } = req.params;

  // Validations
  if (price) {
    if (!Number(price)) return res.status(400).json(["price must be numeric"]);
  }
  if (stock) {
    if (!Number(stock)) return res.status(400).json(["stock must be numeric"]);
  }
  if (thumbnail) {
    if (!Array(thumbnail))
      return res.status(400).json(["thumbnail must be an array"]);
  }

  if (!Number(pid)) return res.status(400).json(["id must be numeric"]);

  try {
    const response = await productModel.updateProduct(Number(pid), {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = { router };
