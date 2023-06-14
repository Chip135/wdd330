const baseURL = import.meta.env.VITE_SERVER_URL;

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

export async function loginRequest(creds){
  let url = `http://server-nodejs.cit.byui.edu:3000/login`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(creds),
  });

}

export async function getOrders(orders) {
  let url = `http://server-nodejs.cit.byui.edu:3000/orders`;
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${orders}`
    }
  };
  return await fetch(url, options).then(convertToJson);
}