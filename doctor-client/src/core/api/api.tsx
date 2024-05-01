import axios from "axios";

const api = axios.create({
  baseURL: "https://hcis2-project.onrender.com/api/",
});

export default api;