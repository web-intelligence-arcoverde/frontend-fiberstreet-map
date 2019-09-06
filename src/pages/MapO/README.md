## Carregando os ícones no mapa e alterando suas características

# Tentativa 1

```js
api.get("/get/cto").then(result => {
  const { data } = result;
  const dados = {
    type: "FeatureCollection",
    features: data
  };
  map.getSource("drone").setData(dados);
});
```

- No caso acima podemos tentar obter os dados via backend para cada caso, por exemplo:

```js
function carregarCtosNoMapa(ctoArray) {
  let ctosCheias = [];
  let ctosNormais = [];
  ctoArray.map(cto => {
    if (cto.full) {
      ctosCheias.push(cto);
    } else {
      ctosNormais.push(cto);
    }
  });

  const dadosCtoNormal = {
    type: "FeatureCollection",
    features: ctosNormais
  };
  map.getSource("ctosNormais").setData(dadosCtoNormal);

  const dadosCtoCheia = {
    type: "FeatureCollection",
    features: ctosCheias
  };
  map.getSource("ctosCheias").setData(dadosCtoCheia);
}

api.get("/get/cto").then(result => {
  const { data } = result;
  carregarCtosNoMapa(data);
});
```

### No nosso backend

- Nós teremos que fazer a verificação de consultar o splitter da cto percorrendo-o para verificarmos se todas as saídas do splitter estão sendo utilizadas de acordo com o _número de saídas_
- Caso o número de saídas esteja completo nós iremos colocar o atributo **FULL** na cto em questão e retornaremo-nos-a para o nosso FRONTEND

# Tentativa 2

```js
map.loadImage(require("../../assets/images/CTO_24x24.png"), function(
  error,
  image
) {
  if (error) throw error;
  map.addImage("custom-CTO", image);
  /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
  map.addLayer({
    id: "drone",
    type: "symbol",
    source: "drone",
    layout: {
      "icon-image": "custom-CTO"
      // Outra possível solução
      "icon-image": map.getSource("drone").forEach(element => element.) etc
    }
  });
});

```
