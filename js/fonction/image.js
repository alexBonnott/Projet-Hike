
const img = document.getElementById("overlay-img");

let scale = 1;
let isDraging = false;
let posX = 0;
let shiftX;

img.addEventListener("wheel", (e) => {
    e.preventDefault();
    if(e.deltaY < 0){
        scale += 0.1;
    }
    else{
        scale -= 0.1;
        if(scale < 1) scale = 1;
    }
    updateTransform();
});

img.addEventListener("mousedown", (e) =>{
    if(isDraging){
        isDraging = false;
        posX = 0;
        updateTransform();
    }
    else{
        isDraging = true;
        shiftX = e.clientX - posX;
        img.style.cursor = "grabbing";
    }
});

img.addEventListener("mouseleave",(e) =>{
    isDraging = false;
    posX = 0;
    updateTransform();
});

img.addEventListener("mousemove", (e) => {
    if(!isDraging) return;
    if((Math.abs(posX) > (window.innerWidth/2))){
        isDraging = false;
        posX = 0;
    }
    else{
        posX = e.clientX - shiftX;
    }
    updateTransform();
});

function updateTransform(){
    img.style.transform = `translate(${posX}px) scale(${scale})`;
}
