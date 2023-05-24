import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

const catParam = getParam("category");

productList(".product-list", catParam);
