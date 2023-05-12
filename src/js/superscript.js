import { getLocalStorage } from "./utils.mjs";

export function cartCount() {
  const cartItems = getLocalStorage("so-cart");
  document.getElementById("count").innerHTML = cartItems.length;
}
//document.getElementById("addToCart").addEventListener("click", cartCount);
export function runCartCount() {
  const cartItems = getLocalStorage("so-cart").length;
  if (cartItems >= 1) {
    cartCount(cartItems);
  }
}

runCartCount();
