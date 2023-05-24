import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { getParam } from "./utils.mjs";

function productcardTemplate(product){
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <div class="cart-card_prices">
        <p>Suggested Retail: <span class="cart-card_suggested_price">$${product.SuggestedRetailPrice}</span></p>
        <p>Your Price: <span class="cart-card__price">$${product.FinalPrice}</span></p>
      </div></a>
  </li>`
}

export default async function productList(selector, category){
    const productElement = document.querySelector(selector);
    const data = await getData(category);
    let newkeep = data.filter(el =>
        el.Id != "989CG" &&
        el.Id != "880RT"
    );
    }
    renderListWithTemplate(productcardTemplate, productElement, newkeep);
}

function changeTitle() {
  const title = getParam("category");
  document.querySelector(".cat-name").innerText = title.charAt(0).toUpperCase() + title.slice(1);
  
};

changeTitle();

