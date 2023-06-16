const baseURL = import.meta.env.VITE_SERVER_URL;
//const baseURL = `http://server-nodejs.cit.byui.edu:3000/login`;

async function convertToJson(res) {
  let jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse};
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response2 = await fetch(baseURL + `product/${id}`);
  const data2 = await convertToJson(response2);
  return data2.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

// export async function loginRequest(creds){
//   // let url = `http://server-nodejs.cit.byui.edu:3000/login`;
//   console.log("inside loginRequest function");
//   const options ={
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(creds),
// };
//   const response =  await fetch(baseURL + "login", options).then(convertToJson);
//   return response.accessToken;
// }
export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}