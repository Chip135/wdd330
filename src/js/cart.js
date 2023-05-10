import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">Color(s): ${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <div class="cart-card_prices">
    <p>Suggested Retail: <span class="cart-card_suggested_price">$${item.SuggestedRetailPrice}</span></p>
    <p>Your Price: <span class="cart-card__price">$${item.FinalPrice}</span></p>
  </div>
</li>`;

  return newItem;
}

renderCartContents();
