import { getLocalStorage } from "./utils.mjs";

export function cartCount() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    document.getElementById("count").innerHTML = 0;
  } else {
    document.getElementById("count").innerHTML = cartItems.length;
  }
}

cartCount();
