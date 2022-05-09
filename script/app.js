//-------------------------
//LOCAL STORAGE UTILS
//-------------------------
function getLocalStorage(key) {
    val = localStorage.getItem(key)
    if (val !== null){
        return val
    }
    return false
}
function addLocalStorage(key, value) {
    localStorage.setItem(key, value)
}
function removeLocalStorage(key) {
    localStorage.removeItem(key)
}

//-----------------------
//DROPDOWN MOBILE FOOTER
//-----------------------
const dropButtonFoot = document.getElementsByClassName("foot-mobile");
const dropContainer = document.getElementsByClassName('container-help');

for(var i=0; i<dropButtonFoot.length;i++){
    dropButtonFoot[i].addEventListener("click",dropFooter.bind(null, i));
}
function dropFooter(i){
    var style = window.getComputedStyle(dropContainer[i].children[1])
    if (style.getPropertyValue("height") === "0px"){
        dropContainer[i].children[1].style.height = "150px";
        dropButtonFoot[i].children[2].children[1].style.transform = " rotateZ(90deg) scaleX(0.1)";
    } else {
        dropContainer[i].children[1].style.height = "0px";
        dropButtonFoot[i].children[2].children[1].style.transform = "scaleX(0)";
        dropButtonFoot[i].children[2].children[1].style.transform = "rotateZ(90deg) translateX(0px)";
        dropButtonFoot[i].children[2].children[1].style.opacity = "1";
    }
}

//-------------------------------
//PARALLAX
//-------------------------------
const image = document.getElementsByClassName("main-pics-container")[0].children[0].children[0];
function onMouseMove (event) {
    const target = event.currentTarget;
    const w = target.offsetWidth / 2;
    const h = target.offsetHeight / 2;
    var y = event.clientY - h;
    var x = event.clientX - w;
    image.style.filter = (`drop-shadow(${x/30-70}px ${y/30+30}px 4px var(--strawberry-color))`);
    image.style.transform = `translate(0px,${y/8}px)`;
}

image.addEventListener('mousemove', function (event) {
    onMouseMove(event);
  });

//-------------------------------
//EMAIL FORM FOOTER
//-------------------------------
const sendButton = document.getElementById("mail-letter-button");
const children = sendButton.children;
const form = document.getElementById("form");

function handleForm(event) {
    var v = document.getElementById("mail-letter-input");
    v.value="";
    event.preventDefault();
    children[1].style.bottom = "0%";
    children[2].style.bottom = "100%";
    setInterval(() => {
        children[0].style.left = "0%";
        children[1].style.left = "100%";
    }, 1000);
    setInterval(() => {
        children[0].children[1].children[0].style.opacity = "1";
    }, 2000);
}
form.addEventListener("submit", e => handleForm(e));

//-------------------------------
//NAVBAR BANNER
//-------------------------------
const banner = document.getElementsByClassName("navbar-banner");
const closeBannerButton = document.getElementById("close-banner-button");
closeBannerButton.addEventListener("click", closeBannerHandler, null)

function closeBannerHandler() {
    banner[0].style.display="none"
    addLocalStorage("banner", "")
}
function getBanner() {
    let closed = getLocalStorage("banner")
    if (closed !== null) {
        banner[0].style.display="none"
    }
}
getBanner()

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
        first.children[1].children[3].classList.add("smooth-animation");
    } else {
        first.classList.remove("animation-card-div");
        first.style.transform = 'translateX(-20%)';
        first.children[1].children[3].classList.remove("smooth-animation");
    }
    //soluzione 2 diminuisco la soglia di ingresso dell'animazione
    //a 0.98 facendo innescare precocemente l'animazione dove 0s {-20%}
    if (elementIsVisible(second, 0.98)) {
        second.classList.add("animation-card-div-rev");
        second.children[1].children[3].classList.add("smooth-animation");
    } else {
        second.classList.remove("animation-card-div-rev");
        second.children[1].children[3].classList.remove("smooth-animation");
    }
    //TODO: soluzione tre: smooth reentrancy
}