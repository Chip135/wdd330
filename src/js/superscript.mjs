import { getLocalStorage } from "./utils.mjs";



export async function cartCount() {
  const cartItems = await getLocalStorage("so-cart");
  let count = 0;
  if (!cartItems) {
    return
  } else {
    cartItems.forEach(e => {
      count += e.Quantity;
    });
   document.querySelector("#count").innerHTML = count;
 };
};
