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
    /* */
    $.getJSON("caen.json", function(osm_lines) {
        var source_name = Object.keys(osm_lines["sources"]);
        if (typeof(source_name) == "string") {
            var source_detail = osm_lines["sources"][source_name];
            map.addSource(source_name, source_detail);
        } else {
            for (var i in source_name) {
                name = source_name[i];
                var source_detail = osm_lines["sources"][name];
                map.addSource(name, source_detail);
            }
        }
        for (var i in osm_lines["layers"]) {
            map.addLayer(osm_lines["layers"][i]);
        }
        $.getJSON('stop_point_lines.json', function (spl_geojson) {
            console.log(spl_geojson.features[0]);
            spl_geojson.features.forEach(function (marker) {
                marker.properties.offset = [parseInt(marker.properties.offset_x), parseInt(marker.properties.offset_y)];
            });
            setTimeout(function(){
                map.getSource('stop_point_lines').setData(spl_geojson)
            }, 1000);
        });
    });
    /*
    $.getJSON("caen.json", function(json_conf) {
        $.getJSON('stop_points.geojson', function (sp_geojson) {
            map.addSource("stop_points", {
                "type": "geojson",
                "data": sp_geojson
            });
            $.getJSON('stop_point_lines.geojson', function (spl_geojson) {
                spl_geojson.features.forEach(function (marker) {
                    marker.properties.offset = [marker.properties.offset_x, marker.properties.offset_y];
                });
                map.addSource("stop_point_lines", {
                    "type": "geojson",
                    "data": spl_geojson
                });

                map.addLayer({
                    "id": currentKey, // Sets id as current child's key
                    "source": currentKey, // The source layer defined above
                });
            });
        });
    });
    */
});
