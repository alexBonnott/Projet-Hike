function openMenu(){
    const menu = document.getElementById("menu-deroulant");
    if(menu.style.visibility=="visible"){
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    } 
    else{
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
    }
}

function openSousMenu(){
    const sousMenu = document.getElementById("sousOptionD");
    if(sousMenu.style.visibility == "visible"){
        sousMenu.style.visibility = "hidden"
        sousMenu.style.opacity = "0";
    }
    else{
        sousMenu.style.visibility = "visible";
        sousMenu.style.opacity = "1";
    }
}