import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let gproduct = {};
export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  let  product = await findProductById(productId);
  gproduct = product;
  // once we have the product details we can render out the HTML
  renderProductDetails(product);
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
  //console.log(`Add to cart was clicked`);
}
function addToCart() {
    //let cartArray = [];
  let cartArray = getLocalStorage("so-cart");
  // console.log(`cartArray: ${cartArray}`);
  if (!cartArray) {
    //console.log(`entered if statement`);
    cartArray = [];
    setLocalStorage("so-cart", cartArray);
  }
  cartArray.push(gproduct);
  //console.log(`push cartArray: ${cartArray}`);
  setLocalStorage("so-cart", cartArray);
}
function renderProductDetails(product) {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productSuggestedPrice").innerText = `$${product.SuggestedRetailPrice}`;
  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
  document.querySelector("#productColorName").innerText = `Color(s): ${product.Colors[0].ColorName}`;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}