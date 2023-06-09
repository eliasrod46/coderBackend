class ProductManager {
  constructor() {
    this.products = [];
  }

  //método “addProduct”.
  addProduct({ title, description, price, thumbnail, code, stock }) {
    // props sin valor por defecto, todos los datos son obligatorios

    // Validar “code” como unico
    const checkCodeDuplicate = this.products.find(
      (product) => product.code === code
    );
    // Verifico que el producto no tengo un codigo repetido
    if (checkCodeDuplicate) return "Codigo de producto ya existente";

    // asigno id autoincrementable
    let id = 0;
    if (this.products.length === 0) {
      id = 1;
    } else {
      id = this.products[this.products.length - 1].id + 1;
    }

    // creo el obj producto y lo aagrego al array con push
    let product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    return "El producto fue agregado con exito";
  }

  // método “getProducts”
  getProducts() {
    // retorno el array de productos completo
    return this.products;
  }

  // método “getProductById”
  getProductById(id) {
    // busco en al array de productos coincidencia de id
    const product = this.products.find((product) => product.id === id);
    if (!product) return "Not found";

    return product;
  }
}

const productManager = new ProductManager();

module.exports = productManager;
