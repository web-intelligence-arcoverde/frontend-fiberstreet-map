import api from './api'

/** Obtém os dados do servidor e armazena no redux para mostrar no mapa */
export const obterDadosDoServidor = async (type) => {
  let information = {
    type: type
  };

  var dados;

  await api
    .post(`/get/${type}`, information)
    .then(result => {
      var data = result.data;
      dados = data;
      // setCtoFromServer(dados)
    })
    .catch(err => {
      console.warn(err);
    });
  return dados;
}

/** Obtém os dados do servidor e armazena no redux para mostrar no mapa */
// export const obterDadosDoServidor = async (type, setCtoFromServer) => {
//   let information = {
//     type: type
//   };

//   var dados;

//   await api
//     .post(`/get/${type}`, information)
//     .then(result => {
//       var data = result.data;
//       dados = data;
//       setCtoFromServer(dados)
//     })
//     .catch(err => {
//       console.warn(err);
//     });
//   return dados;
// }