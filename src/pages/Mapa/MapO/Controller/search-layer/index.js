export const searchLayer = (map, filterInput, store) => {
  filterInput.addEventListener('keyup', function(e) {
    const value = e.target.value.trim().toLowerCase();
    const layerIds = store.getState().map.layerData;
    //layerIds.forEach(function(layerId) {
    /*map.setLayoutProperty(
        layerId,
        'visibility',
        layerId.indexOf(value) > -1 ? 'visible' : 'none'
      );*/
    //});
  });
};
