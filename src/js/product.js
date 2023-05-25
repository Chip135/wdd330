import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { shakeCart } from "./shakecart.mjs";

const productId = getParam("product");
productDetails(productId);
shakeCart();

// console.log(`Product ID: ${productId}`);
// console.log(`Product ID: ${findProductById(productId)}`);
