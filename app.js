//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------LOCALSTORAGE UTILS-------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
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
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-----------------------BUTTON MOBILE FOOTER-------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
const dropButtonFoot = document.getElementsByClassName("foot-mobile")
const dropContainer = document.getElementsByClassName('container-help')

for(var i=0; i<dropButtonFoot.length;i++){
    dropButtonFoot[i].addEventListener("click",dropFooter.bind(null, i))
}
function dropFooter(i){
    var style = window.getComputedStyle(dropContainer[i].children[1])
    if (style.getPropertyValue("height") === "0px"){
        dropContainer[i].children[1].style.height = "150px"
        // dropButtonFoot[i].children[1].innerHTML = minusSVG
        dropButtonFoot[i].children[2].children[1].style.transform = " rotateZ(90deg) scaleX(0.1)"

    } else {
        dropContainer[i].children[1].style.height = "0px"
        dropButtonFoot[i].children[2].children[1].style.transform = "scaleX(0)"
        dropButtonFoot[i].children[2].children[1].style.transform = "rotateZ(90deg) translateX(0px)"
        dropButtonFoot[i].children[2].children[1].style.opacity = "1"

    }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-----------------------------PARALLAX-------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
const image = document.getElementsByClassName("main-pics-container")[0].children[0]
function onMouseMove (event) {
    const target = event.currentTarget
    const w = target.offsetWidth / 2
    const h = target.offsetHeight / 2
    var y = event.clientY - h
    var x = event.clientX - w
    image.style.filter = (`drop-shadow(${x/10-70}px ${y/10+30}px 6px var(--strawberry-color))`)
    image.style.transform = `translate(${x/10}px,${y/10}px)`
    console.log(x)
}

image.addEventListener('mousemove', function (event) {
    onMouseMove(event)
  });

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//------------------------EMAIL FORM FOOTER---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
const sendButton = document.getElementById("mail-letter-button")
const child = sendButton.children

function handleForm(event) {
    var v = document.getElementById("mail-letter-input")
    var val = v.value
    v.value=""
    // alert("submit: " + val)
    event.preventDefault()
    child[1].style.bottom = "0%"
    child[2].style.bottom = "100%"

    setInterval(() => {
        child[0].style.left = "0%"
        child[1].style.left = "100%"
    }, 1000);
    setInterval(() => {
        child[0].children[1].children[0].style.opacity = "1"
    }, 2000);

}
const form = document.getElementById("form")

form.addEventListener("submit", e => handleForm(e))

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------CLOSE NAV BANNER---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
const banner = document.getElementsByClassName("navbar-banner")
const closeBannerButton = document.getElementById("close-banner-button")

function closeBannerHandler() {
    banner[0].style.display="none"
    console.log("ehmmm")
    addLocalStorage("banner", "")
}
function getBanner() {
    let closed = getLocalStorage("banner")
    if (closed !== null) {
        banner[0].style.display="none"
    }
}
closeBannerButton.addEventListener("click", closeBannerHandler, null)
getBanner()

// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
// //---------------------------NAVBAR MENU------------------------------//
// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//animation
//return boolean
//d for changhe rapidly item's rules on screen appareance
function elementIsVisible(el, threshold) {
    const elementTop = el.getBoundingClientRect().top;
    const calc = (window.innerHeight || document.documentElement.clientHeight) / threshold
    return (
      elementTop <= calc
    );
}
function elementIsInvisible(el, d) {
    const elementTop = el.getBoundingClientRect().top;
    const c = (window.innerHeight || document.documentElement.clientHeight) / d
    return (
      elementTop <= c
    );
}
window.addEventListener("scroll", handleScrollAnimation, null)
function handleScrollAnimation(){
    const scrollable =  document.querySelectorAll(".card-grid")
    const first = scrollable[0]
    const second = scrollable[1]
    //soluzione 1 rimuovo animazione e traslo x di -20%(posizione partenza dell'animazione)
    //rimuovo lo scatto iniziale da 0 a -20% durante uno scroll veloce
    //e non attivo antetempo l'animazione
    //UX migliore
    if (elementIsVisible(first, 1)) {
        first.classList.add("animation-card-div")
        first.children[1].children[3].classList.add("smooth-animation")
    } else {
        first.classList.remove("animation-card-div")
        first.style.transform = 'translateX(-20%)'
        first.children[1].children[3].classList.remove("smooth-animation")
    }
    //soluzione 2 diminuisco la soglia di ingresso dell'animazione
    //a 0.98 facendo innescando precocemente l'animazione dove 0s {-20%} 
    if (elementIsVisible(second, 0.98)) {
        second.classList.add("animation-card-div-rev")
        second.children[1].children[3].classList.add("smooth-animation")
    } else {
        second.classList.remove("animation-card-div-rev")
        second.children[1].children[3].classList.remove("smooth-animation")
    }
    //TODO: soluzione tre: smooth reentrancy
}