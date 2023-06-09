const fs = require("fs");
const { productModel } = require("./ProductManagerDaoFS");

class CartManagerFS {
  constructor(path) {
    this.path = path;
  }

  // Leo el archivo y guardo los datos convertidos en array(si no existe lo crea)
  async #arrayCarts() {
    if (fs.existsSync(this.path)) {
      const cartsStr = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(cartsStr);
      return carts;
    } else {
      await fs.promises.writeFile(this.path, "[]");
      const cartsStr = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(cartsStr);
      return carts;
    }
  }

  // La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
  // - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
  // - products: Array que contendrá objetos que representen cada producto
  async addCart() {
    try {
      // Obtengo array de caritos
      const carts = await this.#arrayCarts();

      // asigno id autoincrementable
      let id = 0;
      if (carts.length === 0) {
        id = 1;
      } else {
        id = carts[carts.length - 1].id + 1;
      }

      carts.push({ id, productos: [] });
      // Guardo el objeto en el archivo
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

      return "El carrito fue creado con exito";
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }

  // La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
  async getCart(id) {
    try {
      // Obtengo array de caritos
      const carts = await this.#arrayCarts();

      // busco en al array de productos coincidencia de id
      const cart = carts.find((cart) => cart.id === id);
      if (!cart) return "Not found";

      return cart.products;
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }

  // La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
  // - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
  // - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
  // - - Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.
  async addProductToCart(cid, pid) {
    try {
      // Obtengo array de caritos
      const carts = await this.#arrayCarts();
      const recivedProduct = await productModel.getProductById(pid);

      // Busco si existe un producto con el id recibido
      const indexCart = carts.findIndex((cart) => cart.id === cid);

      if (recivedProduct == "Not found") return "Producto no encontrado";
      if (indexCart === -1) return "Carrito no encontrado";

      // Busco si el articulo esta en el carrito
      const foundProduct = carts[indexCart].products.findIndex(
        (product) => product["product"] == recivedProduct.id
      );

      // verifico si el producto ya esta en el carrito
      if (foundProduct === -1) {
        carts[indexCart].products.push({
          product: recivedProduct.id,
          quantity: 1,
        });
      } else {
        carts[indexCart].products[foundProduct].quantity += 1;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return "El producto fue agregado con exito al carrito";
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }

  //----------------------
  async getCarts() {
    try {
      // Obtengo array de caritos
      const carts = await this.#arrayCarts();
      return carts;
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }
}

// const cartModel = new CartManagerFS("./BBDDJson/carts.json");
const cartModel = new CartManagerFS("./BBDDJson/cartsTest.json");

module.exports = { cartModel };
