map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

var popup = new mapboxgl.Popup({
    closeButton: false
});



map.on('load', function() {
    map.loadImage('bus_station.png', (error, image) => {
        if (error) throw error;
        map.addImage('bus_station', image);
    });
    $.getJSON("caen.json", function(osm_lines) {
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


});
