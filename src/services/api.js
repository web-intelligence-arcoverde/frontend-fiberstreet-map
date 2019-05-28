import axios from "axios";

/** This API will connect to NodeJS Server */
const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default api;
