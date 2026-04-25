
        // L'id du container, par exemple <div id="map"></div>
        var map = L.map('map').setView([47.321548, 4.982479], 12);
		
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

        map.addControl(new L.Control.FullScreen());

        var baseMaps = {
            "PlanIgn": planIGN,
            "OpenStreetMap": streetMap,
            "Satellite" : satellite
        };

        //Ajout de parcour gpx


        new L.GPX("../gpx/versnotredamedetang/versnotredamedetang.gpx", {
            async: true,
            polyline_options: {
            color: "blue",
            },
            markers:{
                startIcon : null,
                endIcon : null
            }
        }).addTo(map);
        
        //Ajout variante

        new L.GPX("../gpx/versnotredamedetang/cheminvarianteversnotrededamedetang.gpx", {
            async: true,
            polyline_options: {
            color: "red",
            },
            markers:{
                startIcon : null,
                endIcon : null
            }
        }).addTo(map);
    //Ajout des calques à la carte
    
    const points = [
    {latLng : [47.321390, 4.981930], icon : 1},
    {latLng : [47.302913, 4.947741], icon : 2},
    {latLng : [47.293492, 4.932720], icon : 3},
    {latLng : [47.293064, 4.924372], icon : 4},
    {latLng : [47.296436, 4.901381], icon : 5},
    {latLng : [47.316378, 4.912402], icon : 6},
    {latLng : [47.333482, 4.970607], icon : 7},
    {latLng : [47.324372, 4.986033], icon : 8}
    ];

    points.forEach(p =>{
        L.marker(p.latLng, {
            icon : L.divIcon({
                className : "icon-marker",
                html : `<a href="#partie${p.icon}"><div class="marker">${p.icon}</div></a>`,
                iconSize : [30, 30],
                iconAnchor: [15, 15]
            })
        }).addTo(map);
    });

    L.control.layers(baseMaps).addTo(map);
    
    const nbPhoto = 5;

    const images = [
        "../image/boucledelavalleedelouche/image1.jpg",
        "../image/boucledelavalleedelouche/image2.jpg",
    ]

    let index = 0;

    function showImage(){
        document.getElementById("overlay-img").src = images[index];
        document.getElementById("nb-photo").innerHTML = "photo : " + (index+1) + "/" + images.length;
    }

    function openImage(img){
        document.getElementById("overlay").style.display = "flex";
        index = parseInt(img.dataset.index);
        showImage();
    }

    function seeMore(){
        index = 2;
        document.getElementById("overlay").style.display = "flex";
        showImage();
    }

    function switchLeft(){
        if(index != 0) index -= 1;
        else index = (images.length-1);
        showImage();
    }

    function switchRight(){
        if(index != (images.length-1)) index += 1;
        else index = 0;
        showImage();
    }


    function closeImg(){
        document.getElementById("overlay").style.display = "none";
        index = 0;
    }

    let index1 = 0;

    let startX = 0;

    document.getElementById("overlay").addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    document.getElementById("overlay").addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            // swipe gauche → image suivante
            index++;
            if (index >= images.length) index = 0;
        } else if (endX - startX > 50) {
            // swipe droite → image précédente
            index--;
            if (index < 0) index = images.length - 1;
        }

        img.src = images[index];
        showImage();
    });