
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

        //Chargement du fichier json

        const response = await fetch('../json/sentiers.json');
        const lSentiers = await response.json();

        //Affichage sur la carte

        lSentiers.forEach(function(s){
            new L.GPX(s.gpx, {
            async: true,
            polyline_options: {
            color: s.couleur,
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
            <b>Distance: `+ s.distance+` km<br>Dénivelé positif: `+s.denivele_p+` m<br>
            Dénivelé negatif: `+s.denivele_n+` m</b>
            <br>
            <br>
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
    map.addControl(new L.Control.FullScreen());
     
    //Ajout de la fonction de recherche de localisation
    var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
    placeholder: "Rechercher une ville..."
    }).addTo(map);
    

    geocoder.on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    map.fitBounds(bbox);
    });