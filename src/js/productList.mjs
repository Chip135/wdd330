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
    
    renderListWithTemplate(productcardTemplate, productElement, newkeep);
    
}

function changeTitle() {
  const title = getParam("category");
  const string = getParam("search");
  if (!title) {
    document.querySelector(".cat-name").innerText = string;
  } else {
    document.querySelector(".cat-name").innerText = title.charAt(0).toUpperCase() + title.slice(1);
  }
  
  
};

changeTitle();

async function searchString() {
  const string = await getParam("search");
  if (!string) {
    return
  } else {

  
  string.toLowerCase();
    
  var data1 = await getData("tents");
  var data2 = await getData("backpacks");
  var data3 = await getData("hammocks");
  var data4 = await getData("sleeping-bags");

  const fulldata = [...data1, ...data2, ...data3, ...data4];
  
  var newkeep = fulldata.filter(el =>
    el.Name.toLowerCase().includes(string)
  );
}
  
  const productElement = document.querySelector(".product-list");
    
  renderListWithTemplate(productcardTemplate, productElement, newkeep);

}

searchString();