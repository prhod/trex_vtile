map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

var popup = new mapboxgl.Popup({
    closeButton: false
});



map.on('load', function() {

    $.getJSON("osm_lines.json", function(osm_lines) {
        var source_name = Object.keys(osm_lines["sources"]);
        console.log(source_name);
        if (typeof(source_name) == "string") {
            var source_detail = osm_lines["sources"][source_name];
            map.addSource(source_name, source_detail);
        } else {
            for (i in source_name) {
                name = source_name[i];
                var source_detail = osm_lines["sources"][name];
                map.addSource(name, source_detail);
            }
        }
        for (i in osm_lines["layers"]) {
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

map.on('render', function(e) {
    if (map.loaded()) {
        var lines_list = document.getElementById('map-overlay');
        lines_list.innerHTML = "Liste des lignes <br>";

        all_other_lines = map.queryRenderedFeatures({
            layers: ['other_lines']
        });
        all_other_lines_names = all_other_lines.map(function(x) {
            return x.properties.name;
        })
        var dedup = all_other_lines_names.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        });


        for (i in dedup.sort()) {
            lines_list.innerHTML += dedup[i] + "<br>";
        }
    }
});
