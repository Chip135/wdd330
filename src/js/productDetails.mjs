import { findProductById } from "./productData.mjs";
import { cartCount } from "./superscript.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { shakeCart } from "./shakecart.mjs";



let gproduct = {};
export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  let  product = await findProductById(productId);
  gproduct = product;
  
  Object.assign(gproduct, {"Quantity":1});
  // once we have the product details we can render out the HTML
  await renderProductDetails(product);
  // once the HTML is rendered we can add a listener to Add to Cart button
  let cartButton = document.getElementById("addToCart");
  if(!cartButton) {
    return
  } else {
    cartButton.addEventListener("click", addToCart, shakeCart);
  }
};
  // console.log(`Add to cart was clicked`);

function addToCart() {
    //let cartArray = [];
  let cartArray = getLocalStorage("so-cart");
  let existing = false; //To check if exists or not
  
  if (!cartArray) {
    cartArray = [];
    setLocalStorage("so-cart", cartArray);
  } else {
    if (cartArray.length == 0) {
        return //so can be added at last
    } else {
      //Check if product exist in the cart
      cartArray.map(element => { 
        if (element.Id == gproduct.Id) {
          element.Quantity += 1; // if exists, adds one number
          setLocalStorage("so-cart", cartArray);
          existing = true; // set the existing
        }
      })
      setTimeout(cartCount, 250);
    };
  }
  if (existing == false) { // if the product doesn't exist at last, it will add it
    cartArray.push(gproduct);
  };
 
  setLocalStorage("so-cart", cartArray);
}
function renderProductDetails(product) {
  if(!product) {
    document.querySelector(".product-detail").innerHTML = "Product not found";
 
  } else {

    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productSuggestedPrice").innerText = `$${product.SuggestedRetailPrice}`;
    document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
    document.querySelector("#productColorName").innerText = `Color(s): ${product.Colors[0].ColorName}`;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
    

  }
};


