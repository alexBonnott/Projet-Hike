
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


        new L.GPX("../gpx/verslemontafrique/verslemontafrique.gpx", {
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

        new L.GPX("../gpx/verslemontafrique/cheminvarianteverslemontafrique.gpx", {
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
    {latLng : [47.321565, 4.982513], icon : 1},
    {latLng : [47.326189, 4.983282], icon : 2},
    {latLng : [47.333288, 4.971143], icon : 3},
    {latLng : [47.31949126678269, 4.935713661938761], icon : 4},
    {latLng : [47.300168, 4.926502], icon : 5},
    {latLng : [47.30878553955885, 4.97198479857517], icon : 6}
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
    
    const nbPhoto = 9;

    const images = [
        "../images/verslemontafrique/image1.jpg",
        "../images/verslemontafrique/image2.jpg",
        "../images/verslemontafrique/image3.jpg",
        "../images/verslemontafrique/image4.jpg",
        "../images/verslemontafrique/image5.jpg",
        "../images/verslemontafrique/image6.jpg",
        '../images/verslemontafrique/image7.jpg',
        "../images/verslemontafrique/image8.jpg",
        "../images/verslemontafrique/image9.jpg"
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