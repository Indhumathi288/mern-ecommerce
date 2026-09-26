import axios from "axios";
import localProducts from "./data/products";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getProducts = async () => {
  const response = await API.get("/products");

  const imageMap = {};

  localProducts.forEach((product) => {
    imageMap[product.name] = product.image;
  });

  return response.data.map((product) => ({
    ...product,
    id: product.legacyId,
    image: imageMap[product.name] || product.image,
  }));
};

export default API;