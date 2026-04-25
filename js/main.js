const response = await fetch('../json/sentiers.json');
const lSentiers = await response.json();

const element = document.getElementById("positionRando");

for(let i = 0; i < 3; i++){
    const s = lSentiers[i];
    element.innerHTML += `
                    <div class="randonee">
                        <div class="container">
                            <img src=${s.image} />
                            <ul class="textInfo">
                                <li id="info11">${s.distance}km</li>
                                <li id="info12">${s.denivele_p}m↑</li>
                                <li id="info13">${s.denivele_n}m↓</li>
                            </ul>
                        </div>
                        <h3>${s.nom}</h3>
                        <p>${s.region}</p>
                        <p>${s.type}</p>
                        <a href=${s.page}>Voir plus</a>
                        <p class="datePubl">${s.datePub}</p>
                    </div>`;
};