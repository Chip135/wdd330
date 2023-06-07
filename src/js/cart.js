import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import { cartCount } from "./superscript.mjs";

shoppingCart();
setTimeout(cartCount, 250);

let cartEventListeners = document.querySelectorAll(".quantAddSub");

cartEventListeners.forEach((element) => {
  element.addEventListener("click", (btn) => {
    const cartItems = getLocalStorage("so-cart");
    const btnClassList = btn.target.classList;
    // console.log(`btnClassList: ${btnClassList}`);

    let item = "";
    // let itemIndex = "";
    cartItems.forEach((e) => {
      // console.log(`entered forEach`);
      if (btnClassList.contains(e.Id)) {
        item = e;
        // console.log(`forEach if statement item:`);
        // console.log(item);
        // itemIndex = cartItems.indexOf(e);
        // console.log(`forEach if statement itemIndex: ${itemIndex}`);
      }
    });
    // console.log(`exited forEach`);
    // console.log(`item.Quantity pre-increment: ${item.Quantity}`);
    // console.log(cartItems[itemIndex]);

    if (btnClassList.contains("add")) {
      item.Quantity += 1;
      // console.log(`increased quantity`);
    } else if (btnClassList.contains("subtract")) {
      if (item.Quantity <= 1) {
        item.Quantity = 1;
        alert(
          "This item cannot be zero unless you remove it completely from the cart!"
        );
      } else {
        item.Quantity -= 1;
        // console.log(`decreased quantity`);
      }
    }

    // console.log(`newQuantity: ${item.Quantity}`);
    // console.log(cartItems);
    setLocalStorage("so-cart", cartItems);
    // console.log(cartItems);
    // shoppingCart();
    // setTimeout(cartCount, 250);
    location.reload();
  });
});
