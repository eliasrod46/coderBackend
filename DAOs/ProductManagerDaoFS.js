const fs = require("fs");

class ProductManagerFS {
  constructor(path) {
    this.path = path;
  }

  // Leo el archivo y guardo los datos convertidos en array(si no existe lo crea)
  async #arrayProducts() {
    if (fs.existsSync(this.path)) {
      const productosStr = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(productosStr);
      return productos;
    } else {
      await fs.promises.writeFile(this.path, "[]");
      const productosStr = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(productosStr);
      return productos;
    }
  }

  //método Agregar producto.
  async addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    try {
      // Obtengo array de productos
      const productos = await this.#arrayProducts();

      // Validar “code” como unico
      const checkCodeDuplicate = productos.find(
        (product) => product.code === code
      );

      // Verifico que el producto no tengo un codigo repetido
      if (checkCodeDuplicate) {
        return "Codigo de producto ya existente";
      }

      // asigno id autoincrementable
      let id = 0;
      if (productos.length === 0) {
        id = 1;
      } else {
        id = productos[productos.length - 1].id + 1;
      }

      // creo el obj producto y lo agrego al array con push
      let newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true,
        category,
      };
      productos.push(newProduct);
      // Guardo el objeto en el archivo
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productos, null, 2)
      );

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

      // busco en al array de productos coincidencia de id
      const product = productos.find((product) => product.id === id);
      if (!product) return "Not found";

      return product;
    } catch (error) {
      return `Se genero un error: ${error}`;
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
      if (indexProducto < 0) return "No existe un producto con el id recibido";

      // Validar “code” como unico en el caso de recibir un nuevo codigo
      if (productData.code) {
        const checkCodeDuplicate = productos.find(
          (product) => product.code === productData.code
        );
        // Verifico que el producto no tengo un codigo repetido
        if (checkCodeDuplicate) {
          return "Codigo de producto ya existente";
        }
      }

      // Modifico solo los campos enviados, si no se recibe campo apra modificar mantiene el dato anterior
      productos[indexProducto] = {
        id,
        title: productData.title
          ? productData.title
          : productos[indexProducto].title,
        description: productData.description
          ? productData.description
          : productos[indexProducto].description,
        price: productData.price
          ? productData.price
          : productos[indexProducto].price,
        code: productData.code
          ? productData.code
          : productos[indexProducto].code,
        stock: productData.stock
          ? productData.stock
          : productos[indexProducto].stock,
        category: productData.category
          ? productData.category
          : productos[indexProducto].category,
        thumbnail: productData.thumbnail
          ? productData.thumbnail
          : productos[indexProducto].thumbnail,
      };

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productos, null, 2)
      );
      return "El producto fue modificado con exito";
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
      if (indexProducto < 0) return "No existe un producto con el id recibido";

      productos.splice(indexProducto, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productos, null, 2)
      );
      return `Se elimino el producto con el id indicado `;
    } catch (error) {
      return `Se genero un error: ${error}`;
    }
  }
}

const productModel = new ProductManagerFS("./BBDDJson/products.json");

module.exports = { productModel };
