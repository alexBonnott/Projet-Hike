
//Menu principale

const logoOpen = document.querySelector("#logo-menu-open");
const logoClose = document.querySelector("#logo-menu-close")
const menu = document.getElementById("menu-deroulant");
const contenair = document.getElementById("menu-contenair");

logoOpen.addEventListener("click", () => {
    logoOpen.classList.add("open");
    setTimeout(() => {
        openMenu();
    }, 250);

});

logoClose.addEventListener("click", () => {
    closeMenu();
});


function openMenu(){
    contenair.style.visibility = "visible";
    logoOpen.style.visibility = "hidden";
    logoClose.style.visibility = "visible";
    menu.style.visibility = "visible";
    menu.style.opacity = "1";
}

function closeMenu(){
    contenair.style.visibility = "hidden";
    logoOpen.style.visibility = "visible";
    logoOpen.classList.remove("open");
    logoClose.style.visibility = "hidden";
    menu.style.visibility = "hidden";
    menu.style.opacity = "0";
}

//Sous menu

const option = document.querySelectorAll(".optionD");

option.forEach(opt => {
    opt.addEventListener("click", () => {
        opt.classList.toggle("open")
        openSousMenu();
    });
});


function openSousMenu(){
    
    const sousMenu = document.getElementsByClassName("sousOptionD");
    const option = document.getElementsByClassName("optionD");

    for(let el of sousMenu){
        if(el.style.display == "block") el.style.display = "none";
        else{
            el.style.display = "block";
        }
    }

    for(let el of option){
        if(sousMenu[0].style.display == "block"){
            el.style.background = "#2E8B57";
            el.style.color = "white"
        }
        else{
            el.style.background = "rgb(245, 243, 243)";
            el.style.color = "black"
        }
    }
    
}