import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();
let url = getParam("redirect");

const loginBtn = document.querySelector(".submit");
console.log("sup");

loginBtn.addEventListener("click", (e) => {
    console.log("event listened");
    const userName = document.querySelector("#userName").value;
    const password = document.querySelector("#password").value;
    let creds = {userName, password};

    login(creds, url);
});