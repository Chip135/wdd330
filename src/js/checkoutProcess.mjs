import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        console.log("entered init");
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        console.log("finished init");
    },

    calculateItemSummary: function() {
        console.log("entered calculateItemSummary");
        const summaryAmount = checkoutCount();
        document.querySelector("#cartAmount").innerHTML = summaryAmount;
        console.log("finished calculateItemSummary");
    }

    // calculateOrderTotal: async function() {
        // console.log("entered calculateOrderTotal");

        // console.log("finished calculateOrderTotal");
    // }

    // displayOrderTotals: function() {
        // console.log("entered displayOrderTotals");

        // console.log("finished displayOrderTotals");
    // }
}

async function checkoutCount() {
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