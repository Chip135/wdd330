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
  const product = urlParams.get('product');
  return product
}

export function renderListWithTemplate(
  templateFn, 
  list, 
  parentElement, 
  position = "afterbegin", 
  clear = parentElement !== null) {
    //console.log(parentElement);
  if (clear){
    parentElement.innerHTML = "";
    //console.log(parentElement);
  }
    const htmlStrings =  list.map(templateFn);
  if (clear) {
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
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
      //console.log(html);
      return html;
    }
    return res;
  };
}

export function loadHeaderFooter (){
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.getElementById("main-header");
  const footerEl = document.getElementById("main-footer");

  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}