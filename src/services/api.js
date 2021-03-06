import axios from 'axios';
import store from '../redux/store';

const local = 'http://127.0.0.1:3333';
const server = 'https://fiberstreet.dktelecom.net.br';
const local01 = 'http://127.0.0.1:3333/';

export const endPoint = false ? server : local;
export const endPointWs = false
  ? `wss://fiberstreet.dktelecom.net.br`
  : `ws://127.0.0.1:3333`;

/** This API will connect to NodeJS Server */
const api = axios.create({
  baseURL: endPoint,
});

api.interceptors.request.use(config => {
  const { token } = store.getState().auth;
  const { active: provider } = store.getState().provider;
  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (provider) {
    headers.PROVIDER = provider.slug;
  }

  return { ...config, headers };
});

export const API = {
  //Geojson
  GET_CABO_GEOJSON: '/gj/cables',
  GET_CTO_GEOJSON: '/gj/ctos',
  GET_CLIENTE_GEOJSON: '/gj/clients',
  GET_CEO_GEOJSON: '/gj/ceos',

  CREATE_CTO: '/ctos',
  GET_CTO: '/ctos',

  CREATE_SPLITTER: '/splitter/cto',
  GET_SPLITTER_BY_CTO: '/splitter/cto',
  CREATE_CLIENTE: '/cliente',
  GET_CLIENTE: '/cliente',

  GET_CLIENTE_BY_SP: '/cliente/splitter',
  DELETE_CLIENTE: '/cliente',
  CREATE_CABO: '/cabo',
  CREATE_CABO_REL: '/cabo',
  GET_CABO: '/cabo',

  GET_CABO_BY_CTO: '/cabo/cto',
  SAIDA_SP_ADD_CLIENTE: '/saidasplitter/cliente',
  GET_SAIDA_SP_BY_SP: '/saidasplitter/splitter',
  GET_SAIDA_SP_BY_CLIENTE: '/saidasplitter/cliente',
  GET_CLIENTE_BY_SAIDA_SP: id => `/saidasplitter/splitter/${id}/clientes`,
};

export default api;
