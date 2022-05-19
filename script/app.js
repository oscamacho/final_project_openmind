//-------------------------------
//PARALLAX
//-------------------------------
const imageSection = document.querySelector(".main-pics-container section")
const image = document.getElementById("main-image-id") 
const image2 = document.getElementById("main-image-id2");

function onMouseMove (event) {
    let target = event.currentTarget;
    let w = target.offsetWidth / 2;
    let h = target.offsetHeight / 2;
    let y = event.clientY - h;
    let x = event.clientX - w;
    image.style.transform = `translate(${x/-20}px,${y/4}px) scale(1.2)`;
    image2.style.transformOrigin = `bottom right`
    image2.style.transform = `translate(${x/-35}px,${y/14}px) scale(.9)`
    image2.style.filter = (`drop-shadow(${x/30-70}px ${y/30+30}px 4px var(--strawberry-color))`);
    image2.style.filter= `blur(${(event.clientX/280)+0.7}px)`;

}

imageSection.addEventListener('mousemove', function (event) {
    onMouseMove(event);
  });

//-------------------------------
//HOME CARD TRANSITION
//-------------------------------
function elementIsVisible(el, threshold) {
    const elementTop = el.getBoundingClientRect().top;
    const calc = (window.innerHeight || document.documentElement.clientHeight) / threshold
    return (
      elementTop <= calc
    );
}
/**
 * @param {object} el element reference
 * @param {number} threshold threshold number 0<threshold<2 of  before the disappareance of element from bottom
 * screen
 */
function elementIsInvisible(el, threshold) {
    const elementTop = el.getBoundingClientRect().top;
    const calc = (window.innerHeight || document.documentElement.clientHeight) / threshold;
    return (
      elementTop <= calc
    );
}
window.addEventListener("scroll", handleScrollAnimation, null)

function handleScrollAnimation(){
    const scrollable =  document.querySelectorAll(".card-grid");
    const first = scrollable[0];
    const second = scrollable[1];
    //soluzione migliore
    if (elementIsVisible(first, 1)) {
        first.classList.add("animation-card-div");
        first.querySelector("a").classList.add("smooth-animation");
    } else {
        first.classList.remove("animation-card-div");
        first.style.transform = 'translateX(-20%)';
        first.querySelector("a").classList.remove("smooth-animation");
    }
    //soluzione 2 diminuisco la soglia di ingresso dell'animazione
    //a 0.98 facendo innescare precocemente l'animazione dove 0s {-20%}
    if (elementIsVisible(second, 0.98)) {
        second.classList.add("animation-card-div-rev");
        second.querySelector("a").classList.add("smooth-animation");
    } else {
        second.classList.remove("animation-card-div-rev");
        second.querySelector("a").classList.remove("smooth-animation");
    }
    //TODO: soluzione tre: smooth reentrancy
}