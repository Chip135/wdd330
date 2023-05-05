import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  let product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails(product);
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart(product));
  console.log(`Add to cart was clicked`);
}
function addToCart(product) {
  let cartArray = getLocalStorage("so-cart");
  console.log(`cartArray: ${cartArray}`);
  if (!cartArray) {
    console.log(`entered if statement`);
    cartArray = [];
    setLocalStorage("so-cart", cartArray);
  }
  cartArray.push(product);
  console.log(`push cartArray: ${cartArray}`);
  setLocalStorage("so-cart", cartArray);
}
function renderProductDetails(product) {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}