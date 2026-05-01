
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

        L.control.layers(baseMaps).addTo(map);

        //Recuperation du sentier
        const response = await fetch("../../json/sentiers.json");
        const lSentiers = await response.json();
        const nom = document.body.dataset.randonnee.toLowerCase();
        
        const sentier = lSentiers.filter( s => s.nom.toLowerCase() === nom)[0];
      
        //Ajout de parcour gpx
        new L.GPX(sentier.gpx, {
            async: true,
            polyline_options: {
            color: "blue",
            },
            markers:{
                startIcon : null,
                endIcon : null
            }
        }).addTo(map);

        //Ajout variante si il ya variante

        if(sentier.variante != null){
            new L.GPX(sentier.variante, {
            async: true,
            polyline_options: {
            color: "red",
            },
            markers:{
                startIcon : null,
                endIcon : null
            }
        }).addTo(map);
        }

    //Ajout des points sur l'itinéraire
    
    const points = sentier.points;
    
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



    //Recupération de la liste des images du sentier
    const images = sentier.lImages;

    //position dans la liste des images
    let index = 0;

    //Création dynamique de la suite des images pour mobile
    const containerImage = document.getElementById("suite-images");

    for(let i =2; i < images.length; i++){
        containerImage.innerHTML += `<img class="image" alt="image${i+1}" src=${images[i]} data-index="${i}" />`
    };

    //Ajout d'un click sur chaque images pour ouvrir l'overlay au bon index
    document.querySelectorAll(".image").forEach(img => {
        img.addEventListener("click", e => {
            document.getElementById("overlay").style.display = "flex";
            index = parseInt(img.dataset.index);
            showImage();
        })
    });

    //Affichage de l'image sur l'overlay
    function showImage(){
        document.getElementById("overlay-img").src = images[index];
        document.getElementById("nb-photo").innerHTML = "photo : " + (index+1) + "/" + images.length;
    }

    //Ajout d'un clik sur le svg plus pour afficher plus de photo(index 3)
    document.querySelector("#plus").addEventListener("click", e =>{
        index = 2;
        document.getElementById("overlay").style.display = "flex";
        showImage();
    });

    //Ajout click sur le boutton gauche pour swicher d'image dans l'overlay
    document.querySelector("#buttonLeft").addEventListener("click", e =>{
        if(index != 0) index -= 1;
        else index = (images.length-1);
        showImage();
    });

    //Ajout click sur le boutton droit pour swicher d'image dans l'overlay
    document.querySelector("#buttonRight").addEventListener("click", e => {
        if(index != (images.length-1)) index += 1;
        else index = 0;
        showImage();
    });

    //Ajout d'un click sur le svg croix pour fermé l'overlay
    document.querySelector("#close").addEventListener("click", e => {
        document.getElementById("overlay").style.display = "none";
        index = 0;
    });


    //Overlay swipe

    let index1 = 0;

    let oStartX = 0;

    document.getElementById("overlay").addEventListener("touchstart", e => {
        oStartX = e.touches[0].clientX;
    });

    document.getElementById("overlay").addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;

        if (oStartX - endX > 50) {
            // swipe gauche → image suivante
            index++;
            if (index >= images.length) index = 0;
        } else if (endX - oStartX > 50) {
            // swipe droite → image précédente
            index--;
            if (index < 0) index = images.length - 1;
        }

        img.src = images[index];
        showImage();
    });

