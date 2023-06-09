// importo
const productManager = require("./ProductManager");

//TEST METODOS

const productToAdd = {
  title: "producto nuevo",
  description: "prueba descripcion",
  price: 1500,
  thumbnail: "http://.com",
  code: "s45ef7",
  stock: 5,
};

// agregar producto ok
console.log("---------------------- addProductoOk ----------------------");
let addProductok = productManager.addProduct(productToAdd);
console.log(addProductok);
console.log("\n");

// agregar producto ok
console.log("---------------------- addProductFail ----------------------");
let addProductFail = productManager.addProduct(productToAdd);
console.log(addProductFail);
console.log("\n");

// obtener producto por id Ok
console.log("---------------------- getProductoOk ----------------------");
let productosIdOk = productManager.getProductById(1);
console.log(productosIdOk);
console.log("\n");
// obtener producto por id Ok
console.log("---------------------- getProductoFail ----------------------");
let productosIdFail = productManager.getProductById(2);
console.log(productosIdFail);
console.log("\n");

// obtener todos los productos
console.log("--------------------- getAllProductos ---------------------");
let productos = productManager.getProducts();
console.log(productos);
console.log("\n");

console.log("-----------------------------------------------------------");
