import axios from "axios";
import { getToken } from "./api";

// const serverOne = "http://localhost:3334";
// const serverTwo = "http://localhost:3001";
const server = "http://192.168.0.131:3334";
const local = 'http://45.224.40.252:3339';

/** This API will connect to NodeJS Server */
const api = axios.create({
  baseURL: server
});



// api.interceptors.request.use(async config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

export default api;
