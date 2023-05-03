import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);

console.log(`Product ID: ${productId}`);
// console.log(`Product ID: ${findProductById(productId)}`);