import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
let url = getParam(redirect);

document.addEventListener("click", (btn) => {
    const userName = document.querySelector("#userName");
    const password = document.querySelector("#password");

    login(userName, password, url);
});