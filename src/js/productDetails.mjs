import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
    setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
}
// add listener to Add to Cart button
document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);

// CONTINUE HERE FROM STEP 6 OF TEAM ACTIVITY 2 https://byui-cit.github.io/wdd330/ponder/v3/team02.html
// export default function productDetails(productId) {
    
// }