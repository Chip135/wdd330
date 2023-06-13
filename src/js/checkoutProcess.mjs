import { alertMessage, getLocalStorage, removeAllAlerts } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";


function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => 
    //console.log(item);
     ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    })
  );
  return simplifiedItems;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        //console.log("entered init");
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        // this.calculateOrderTotal(); // delete when zip is done
        //console.log("finished init");
    },

    calculateItemSummary: async function() {
        //console.log("entered calculateItemSummary");
        const summaryAmount = await checkoutCount();
        const cartTotal = document.querySelector("#cartTotal")
        cartTotal.innerHTML = summaryAmount;
        this.list.forEach(e => {
            this.itemTotal += e.FinalPrice * e.Quantity;
        });
        //console.log(`total: ${this.itemTotal}`);
        document.querySelector("#subtotal").value = `$${this.itemTotal.toFixed(2)}`;
        //console.log("finished calculateItemSummary");
    },

    calculateOrderTotal: async function() {
        //console.log("entered calculateOrderTotal");
        let itemsAmount = await checkoutCount();
        this.shipping = 10 + (itemsAmount - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
        //console.log("finished calculateOrderTotal");
    },

    displayOrderTotals: async function() {
        //console.log("entered displayOrderTotals");
        document.querySelector("#shipping").value = `$${this.shipping}`;
        document.querySelector("#tax").value = `$${this.tax}`;
        document.querySelector("#order-total").value = `$${this.orderTotal}`;
        //console.log("finished displayOrderTotals");
    },

    checkout: async function (form) {
        const json = formDataToJSON(form);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        //console.log(json);
        try {
          const res = await checkout(json);
          window.location.href = "../checkout/success.html";
          console.log(res);
          localStorage.clear();
        } catch (err) {
          removeAllAlerts();

          //for(let message in err.message){
            //err.message.PromiseResult.forEach(e => {
              err.message.then(e => {
                for(let value of Object.values(e)) {
                  
                  alertMessage(value);
                  //console.log(message);
                }
                //console.log(e);
              });
            //});
            
          //}
          //console.log(err);
        }
      },
};

export async function checkoutCount() {
    const cartItems = await getLocalStorage("so-cart");
    let count = 0;
    if (!cartItems) {
        return
    } else {
        cartItems.forEach(e => {
        count += e.Quantity;
        });
    }
    return count;
}
export default checkoutProcess;