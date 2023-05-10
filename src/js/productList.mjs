import { getData } from "./productData.mjs";

function productcardTemplate(){
    return `<li class="product-card">
    <a href="">
      <img
        src=""
        alt="Image of "
      />
      <h3 class="card__brand"></h3>
      <h2 class="card__name"></h2>
      <p class="product-card__price">$</p></a>
  </li>`
}

export default async function productList(category = "tents"){
    const data = await getData(category);
    console.table(data);
    let productElement = document.querySelectorAll(".product-list");
    data.forEach(product => 
        productElement.innerHTML = productcardTemplate() ,
        console.log("inside foreach loop")


    );
    //productElement.innerHTML = productcardTemplate(data);
    
}

function renderList(list, el) {
    const htmlStrings =  list.map(productCardTemplate);
    el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
}