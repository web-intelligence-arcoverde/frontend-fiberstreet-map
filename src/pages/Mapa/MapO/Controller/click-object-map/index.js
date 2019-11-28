import { handleClickCto } from "./cto";
import { handleClickCeo } from "./ceo";
import { handleClickClient } from "./client";

/*
 * Configuração de evento de clique nos objetos que estão no mapa
 * 'drone' now 'cto' -> Representa a CTO
 */

export const openObject = (map, store) => {
  // Evento de clique nos Clientes
  map.on("click", "cliente", e => handleClickClient(e, store));
  map.on("click", "cliente_inativo", e => handleClickClient(e, store));

  // Cliques na caixa terminal optica
  map.on("click", "cto", e => handleClickCto(e.features[0]));
  map.on("click", "cto_lotada", e => handleClickCto(e.features[0]));
  map.on("click", "cto_cliente_cancelado", e => handleClickCto(e.features[0]));

  //Evento de clique na caixa de emenda
  map.on("click", "ceo", e => handleClickCeo(e));
};
