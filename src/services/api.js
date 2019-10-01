import axios from "axios";
import { getToken } from "./api";
import store from "../redux/store";

// const serverOne = "http://localhost:3334";
// const serverTwo = "http://localhost:3001";
const local = "http://192.168.0.104:3333";
const server = "http://45.224.40.252";

/** This API will connect to NodeJS Server */
const api = axios.create({
  baseURL: local
});

api.interceptors.request.use(config => {
  const { token } = store.getState().auth;

  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export const API = {
  CREATE_CTO: "/cto",
  GET_CTO: "/cto",
  GET_CTO_GEOJSON: "/cto/geojson",
  CREATE_SPLITTER: "/splitter/cto",
  GET_SPLITTER_BY_CTO: "/splitter/cto",
  CREATE_CLIENTE: "/cliente",
  GET_CLIENTE: "/cliente",
  GET_CLIENTE_GEOJSON: "/cliente/geojson",
  GET_CLIENTE_BY_SP: "/cliente/splitter",
  DELETE_CLIENTE: "/cliente",
  CREATE_CABO: "/cabo",
  CREATE_CABO_REL: "/cabo",
  GET_CABO: "/cabo",
  GET_CABO_GEOJSON: "/cabo/geojson",
  GET_CABO_BY_CTO: "/cabo/cto",
  SAIDA_SP_ADD_CLIENTE: "/saidasplitter/cliente",
  GET_SAIDA_SP_BY_SP: "/saidasplitter/splitter",
  GET_SAIDA_SP_BY_CLIENTE: "/saidasplitter/cliente",
  GET_CLIENTE_BY_SAIDA_SP: id => `/saidasplitter/splitter/${id}/clientes`
};

export default api;
