import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const fetchProducts = () => api.get("/products").then((r) => r.data);
export const fetchFeatured = () => api.get("/products/featured").then((r) => r.data);
export const submitContact = (payload) => api.post("/contact", payload).then((r) => r.data);