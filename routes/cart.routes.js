const { cartModel } = require("../DAOs/CartManagerDaoFS");
const Router = require("express");

const router = Router();

// La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// - products: Array que contendrá objetos que representen cada producto
router.post("/", async (req, res) => {
  try {
    const response = await cartModel.addCart();
    res.status(200).json({ messsage: response });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    if (Number(cid)) {
      const cart = await cartModel.getCart(Number(cid));
      res.status(200).json(cart);
    } else {
      res.status(400).send("id must be numeric");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.
router.post("/:cid/product/:pid", async (req, res) => {
  const { pid, cid } = req.params;
  try {
    if (Number(cid) && Number(pid)) {
      const cart = await cartModel.addProductToCart(Number(cid), Number(pid));
      res.status(200).json(cart);
    } else {
      res.status(400).send("id's must be numeric");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = { router };
