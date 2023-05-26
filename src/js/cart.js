import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import { cartCount } from "./superscript.mjs";

loadHeaderFooter();
shoppingCart();
setTimeout(cartCount, 250);
