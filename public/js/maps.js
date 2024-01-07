var platform = new H.service.Platform({
    'apikey': 'iGcCySSWAxqTe_BqScqJyi5vBycPLVscby6hgE8KRr0'
  });

  // Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
var service = platform.getSearchService();

let landmark = document.querySelector('.main-heading').textContent;
service.geocode({
    q: landmark
}, (result) => {
    // Instantiate (and display) a map object:
var map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: result.items[0].position
    });
    map.addObject(new H.map.Marker(result.items[0].position));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
}, alert);

  