map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

var popup = new mapboxgl.Popup({
    closeButton: false
});

map.on('load', function() {

    $.getJSON("osm_lines.json", function(osm_lines) {
        var source_name = Object.keys(osm_lines["sources"]);
        var source_detail = osm_lines["sources"][source_name];
        map.addSource(source_name, source_detail);
        for (i in osm_lines["layers"]){
            map.addLayer(osm_lines["layers"][i]);
        }
    });


    map.on('mousemove', 'captain_train', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // Single out the first found feature.
        var feature = e.features[0];
        // Display a popup with the name
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.name)
            .addTo(map);
    });
    map.on('mousemove', 'other_lines', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // Single out the first found feature.
        var feature = e.features[0];
        // Display a popup with the name
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.name)
            .addTo(map);
    });
});
