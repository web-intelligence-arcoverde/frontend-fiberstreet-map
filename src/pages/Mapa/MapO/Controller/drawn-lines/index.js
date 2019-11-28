/**
 * Método responsável por criar a polyline de adição atual
 */
import { source } from "./source";

export const drawn = map => {
  map.on("load", () => {
    source(map);
  });
};
