import { getLocalStorage } from "./utils.mjs";

export default async function shoppingCart() {
    const cartItems = getLocalStorage("so-cart");
    if (!cartItems) {
      const htmlItems = "Your Cart is Empty!";
      document.querySelector(".product-list").innerHTML = htmlItems;
    } else {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      let totalItems = 0;
      cartItems.map((item) => (totalItems += (item.FinalPrice * item.Quantity)));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      document.querySelector(".cart-total").innerHTML = `Total: $${totalItems.toFixed(2)}`;
    }};

function cartItemTemplate(item) {
  let total = item.Quantity * item.FinalPrice;
  const newItem = `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">Color(s): ${item.Colors[0].ColorName}</p>
  <div class="quantityBox">
    <button class="${item.Id} quantAddSub add">+</button>
    <p class="cart-card__quantity">Qty: ${item.Quantity}</p>
    <button class="${item.Id} quantAddSub subtract">-</button>
    <button class="removeFromCart" data-id="${item.Id}">X</button></i>
  </div>
  <div class="cart-card_prices">
    <p>Suggested Retail: <span class="cart-card_suggested_price">$${item.SuggestedRetailPrice}</span></p>
    <p>Your Price: <span class="cart-card__price">$${item.FinalPrice}</span></p>
    <p>Total: <span class="cart-card__price">$${total.toFixed(2)}</span></p>
  </div>
</li>`;

  return newItem;
}