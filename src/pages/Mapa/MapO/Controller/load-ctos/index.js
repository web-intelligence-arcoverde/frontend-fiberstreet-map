import api, { API } from "../../../../../services/api";
import { source } from "./addSource";
import { get } from "./get";

export const ctos = (map, url, store) => {
  map.on("load", function() {
    source(map, url);
    get(map, store, api, API);
  });
};