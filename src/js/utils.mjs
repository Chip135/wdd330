// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  // console.log(`Query String: ${queryString}`)
  const urlParams = new URLSearchParams(queryString);
  // console.log(`urlParams: ${urlParams}`)
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(
  templateFn, 
  parentElement, 
  list, 
  position = "afterbegin", 
  clear = parentElement !== null) {
    // console.log(parentElement);
  if (clear){
    parentElement.innerHTML = "";
    // console.log(parentElement);
  }
    const htmlStrings =  list.map(templateFn);
  if (clear) {
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
}

export async function renderWithTemplate(
  templateFn, 
  parentElement, 
  data,
  callback,
  position = "afterbegin", 
  clear = true) {
  if (clear){
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if(callback) {
    callback(data);
  };
}

function loadTemplate(path){
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      // console.log(html);
      return html;
    }
    return res;
  };
}

export function loadHeaderFooter (){
  // console.log("in loadHeaderFooter");
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.getElementById("main-header");
  const footerEl = document.getElementById("main-footer");

  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
  // console.log("finished loadHeaderFooter");
}

export async function alertMessage(message, scroll=true, duration = 3000){
    // create element to hold our alert
    const alert = document.createElement('div');
    // add a class to style the alert
    alert.classList.add('alert');
    // set the contents. You should have a message and an X or something the user can click on to remove
    alert.innerHTML= `<p>${message}</p><span>X</span>`;
    // add a listener to the alert to see if they clicked on the X
    // if they did then remove the child
    alert.addEventListener('click', function(e) {
        if(e.target.tagName == "SPAN" ) { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
          main.removeChild(this);
        }
    });
    // add the alert to the top of main
    const main = document.querySelector('main');
    main.prepend(alert);
    // make sure they see the alert by scrolling to the top of the window
    //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
    if(scroll)
      window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}