map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

var popup = new mapboxgl.Popup({
    closeButton: false
});

map.on('load', function() {

    var source_name = "admin_level_poly";
    var source_detail = {"type": "vector",
                        "tiles": ["http://localhost:6767/admin_level_poly/{z}/{x}/{y}.pbf"]
    };
    map.addSource(source_name, source_detail);

    admin_layers = [
        [1, "#0A11F0", 0.25],
        [2, "#0A84F0", 0.25],
        [3, "#0AF069", 0.25],
        [4, "#0A11F0", 0.25],
        [5, "#0A84F0", 0.25],
        [6, "#0AF069", 0.25],
        [7, "#0A11F0", 0.25],
        [8, "#0A84F0", 0.25],
        [9, "#0AF069", 0.25],
        [10, "#0A11F0", 0.25]
    ];

    for (var i = 0; i < admin_layers.length; i++) {
        layer = {
            "id": "admin" + admin_layers[i][0],
            "source": "admin_level_poly",
            "source-layer": "admin_level_poly",
            "type": "fill",
            "filter": ["in", "admin_level", admin_layers[i][0].toString()],
            "paint": {
                "fill-color": admin_layers[i][1],
                "fill-opacity": admin_layers[i][2]
            }
        }
        console.log(layer);
        map.addLayer(layer);
        //création des boutons d'activation
        var id = "admin" + admin_layers[i][0].toString();
        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);
    }
});
