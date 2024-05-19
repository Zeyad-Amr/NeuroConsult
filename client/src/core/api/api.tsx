import axios from "axios";

const api = axios.create({
  baseURL: "http://54.242.253.211:5000/",
});

export default api;