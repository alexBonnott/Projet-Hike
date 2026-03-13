
        // L'id du container, par exemple <div id="map"></div>
        var map = L.map('map').setView([47.319215, 5.041470], 10);
		
        // Plan IGN avec une transparence de 50%
        var planIGN = L.tileLayer('https://data.geopf.fr/wmts?'+
            '&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM'+
            '&LAYER={ignLayer}&STYLE={style}&FORMAT={format}'+
            '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}',
            {
	            ignLayer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
	            style: 'normal',
	            format: 'image/png',
	            service: 'WMTS',
                opacity: 1,
                attribution: 'Carte © IGN/Geoplateforme'
        });

        planIGN.addTo(map);
		
		var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; OpenStreetMap'
            });

        var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri'
        });

        var baseMaps = {
            "PlanIgn": planIGN,
            "OpenStreetMap": streetMap,
            "Satellite" : satellite
        };

        //Ajout de parcour gpx

        const sentier = [{
            nom : "Sentier des Grands Crues",
            gpx : "../gpx/grandcrues.gpx",
            page: "grandcrues.html",
            color: "red"
        }
        ];

        sentier.forEach(function(s){
            new L.GPX(s.gpx, {
            async: true,
            polyline_options: {
            color: s.color
            },
            markers:{
                startIcon: null,
                endIcon: null
            }
            }).on('click', function(e) {
            L.popup()
        .setLatLng(e.latlng)
        .setContent(`
        <div class="popup-cotenair">
            <b>`+s.nom+`</b><br><br>
            <button
                onclick="window.location.href='`+s.page+`'">
                Voir plus
            </button>
        </div>
        `)
        .openOn(map);
        })
        .addTo(map);
    });
        //Ajout des calques à la carte
        L.control.layers(baseMaps).addTo(map);
