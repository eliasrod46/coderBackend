const fs = require("fs");

class ProductManagerFS {
  constructor(path) {
    this.path = path;
  }

  async #arrayProducts() {
    // Leo el archivo y guardo los datos convertidos en array
    const productosStr = await fs.promises.readFile(this.path, "utf-8");
    const productos = JSON.parse(productosStr);
    return productos;
  }

  //método Agregar producto.
  async addProduct(productData) {
    try {
      // Obtengo array de productos
      const productos = await this.#arrayProducts();

      // Validar “code” como unico
      let codeProduct = productos.find(
        (producto) => producto.code === productData.code
      );
      if (codeProduct) {
        // Error si codigo de producto repetido
        throw new Error("Existe un producto con el mismo codigo");
      } else {
        // asigno id autoincrementable
        let id = 0;
        if (productos.length === 0) {
          id = 1;
        } else {
          id = productos[productos.length - 1].id + 1;
        }

        // creo el obj producto y lo agrego al array con push
        let product = {
          id,
          ...productData,
        };
        productos.push(product);
        // Guardo el objeto en el archivo
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(productos, null, 2)
        );
      }
      return "El producto fue agregado con exito";
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }

  // método “getProducts”
  async getProducts() {
    try {
      // Obtengo array de productos
      const productos = await this.#arrayProducts();

      return productos;
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }

  // método “getProductById”
  async getProductById(id) {
    try {
      // Obtengo array de productos
      const productos = await this.#arrayProducts();

      // Busco si existe un producto con el id recibido
      const idProducto = productos.find((producto) => producto.id === id);

      // si el producto existe lo retorno
      if (idProducto) {
        return idProducto;
      } else {
        throw new Error("No existe un producto con el id recibido");
      }
    } catch (error) {
      return { error: `${error}` };
    }
  }

  // método “updateProduct”
  async updateProduct(id, productData) {
    try {
      // Obtengo array de productos
      const productos = await this.#arrayProducts();

      // Busco si existe un producto con el id recibido
      const indexProducto = productos.findIndex(
        (producto) => producto.id === id
      );

      // si el producto existe lo modifico
      if (indexProducto >= 0) {
        productos[indexProducto] = { id, ...productData };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(productos, null, 2)
        );
        return "El producto fue modificado con exito";
      } else {
        throw new Error("No existe un producto con el id recibido");
      }
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }

  // método “deleteProduct”
  async deleteProduct(id) {
    try {
      // Obtengo array de productos
      const productos = await this.#arrayProducts();

      // Busco si existe un producto con el id recibido
      const indexProducto = productos.findIndex(
        (producto) => producto.id === id
      );

      // si el producto existe lo modifico
      if (indexProducto >= 0) {
        productos.splice(indexProducto, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(productos, null, 2)
        );
        return `Se elimino el producto con el id indicado `;
      } else {
        throw new Error("No existe un producto con el id recibido");
      }
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }
}

module.exports = ProductManagerFS;
