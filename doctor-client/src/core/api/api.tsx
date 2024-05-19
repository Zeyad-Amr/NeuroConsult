import axios from "axios";

const api = axios.create({
  baseURL: "http://54.242.253.211:4000/",
});

export default api;
