
const region = document.body.dataset.region;

const response = await fetch('../json/sentiers.json');
const lSentiers = await response.json();

const filtre = lSentiers.filter(s => s.region === region);

const element = document.getElementById("randonnees");

filtre.forEach(s => {
    element.innerHTML += `
                <div class="contenair">
                    <div class="information-g">
                        <h2>${s.nom}</h2>
                        <hr>
                        <p>Distance : <b>${s.distance}</b></p>
                        <p>Type: <b>${s.type}</b></p>
                        <p>Départ: <b>${s.depart}</b></p>
                        <p>Arrivée : <b>${s.arrivee}</b></p>
                        <p>${s.description}</p>
                        <a class="button" href=${s.page}>Voir plus</a>
                    </div>
                    <div class="information-d">
                        <img src=${s.image}>
                        <hr>
                        <p>Publié le ${s.datePub}</p>
                    </div>
                </div>
                <hr style="border: solid 0.01cm green;">`;
});