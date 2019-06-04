import axios from "axios";
import { getToken } from "./api";

const serverOne = "http://localhost:3333";
const serverTwo = "http://localhost:3001";

/** This API will connect to NodeJS Server */
const api = axios.create({
  baseURL: serverTwo//"http://localhost:3333"
});

// api.interceptors.request.use(async config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

export default api;
