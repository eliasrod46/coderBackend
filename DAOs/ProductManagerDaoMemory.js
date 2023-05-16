class ProductManager {
  constructor() {
    this.products = [
      // productos de ejemplo
      {
        id: 1,
        title: "Producto1",
        description: "descripción del producto",
        price: 74,
        thumbnail: "url:",
        code: "s45ef7",
        stock: 56,
      },
      {
        id: 2,
        title: "Producto2",
        description: "descripción del producto2",
        price: 85,
        thumbnail: "url:2",
        code: "asdf1234",
        stock: 5,
      },
      {
        id: 3,
        title: "Producto3",
        description: "descripción del producto3",
        price: 800,
        thumbnail: "url:3",
        code: "3458545",
        stock: 0,
      },
    ];
  }

  //método “addProduct”.
  addProduct(title, description, price, thumbnail, code, stock) {
    // props sin valor por defecto, todos los datos son obligatorios
    // Validar “code” como unico

    // declaro una bandera en falso, y recorro el array
    let check = false;
    this.products.forEach((product) => {
      if (product.code === code) {
        //cambio la bandera si hay coincidecia de codigos
        check = true;
      }
    });

    // Verifico que el producto no tengo un codigo repetido
    if (check) {
      return "EL codigo de producto ya existe";
    } else {
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
  }

  // método “getProducts”
  getProducts() {
    // retorno el array de productos completo
    return this.products;
  }

  // método “getProductById”
  getProductById(id) {
    // busco en al array de productos coincidencia de id
    let idFind = -1;
    this.products.forEach((product, index) => {
      if (product.id == id) {
        // si hay coincidencia guardo el indice del producto
        idFind = index;
      }
    });

    // verifico si hay coincidencia de id
    if (idFind != -1) {
      return this.products[idFind];
    } else {
      // En caso de no coincidir ningún id, mostrar en consola un error “Not found”
      return "Not found";
    }
  }
}

module.exports = ProductManager;
