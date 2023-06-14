// importo e instancio la clase Producto
const { productModel } = require("./DAOs/ProductManagerDaoFS");
//TEST METODOS

(async () => {
  // producto a agregar
  const newProduct = {
    title: "Ultimo testeo 2",
    description: `descripcion de - Ultimo testeo 2`,
    price: 4,
    thumbnail: "#",
    code: "f97gskz4",
    stock: 112,
  };

  // ----------> agregar producto <----------
  // let addProduct = await productModel.addProduct(newProduct);
  // console.log("---------------------- addProductoTest ----------------------");
  // console.log(addProduct + "\n");

  // ----------> obtener todos los productos <----------
  // let productos = await productModel.getProducts();
  // console.log("--------------------- getAllProductos ---------------------");
  // console.log(productos);
  // console.log("\n");

  // ----------> obtener producto por id <----------
  // let productoId = await productModel.getProductById(1);
  // console.log("---------------------- getProductoOk ----------------------");
  // console.log(productoId);
  // console.log("\n");

  // ----------> editar producto por id <----------
  // let updatedProduct = await productModel.updateProduct(1, newProduct);
  // console.log("--------------------- updateProductTest ---------------------");
  // console.log(updatedProduct + "\n");

  // ----------> eliminar producto por id <----------
  // let deletedProduct = await productModel.deleteProduct(1);
  // console.log("--------------------- deleteProductTest ---------------------");
  // console.log(deletedProduct + "\n");
})();
