window.addEventListener("DOMContentLoaded", (e) => {
    shakeCart();
});


export function shakeCart(){




const addCart = document.getElementById("addToCart");
//console.log(addCart);

addCart.addEventListener("click" , (e) => {
    e.preventDefault();
    const cartIcon = document.getElementById("cartIcon");
    cartIcon.classList.add("apply-shake");
    endShake();
});
}

function endShake(){
    cartIcon.addEventListener("animationend", (e) => {
        cartIcon.classList.remove("apply-shake");
    });
}





