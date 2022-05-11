//-------------------------------
//LOCAL STORAGE
//-------------------------------
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
//-------------------------------
//NAVBAR BANNER
//-------------------------------
var banner = document.getElementsByClassName("navbar-banner")
var closeBannerButton = document.getElementById("close-banner-button")

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


//-------------------------------
//EMAIL FORM FOOTER
//-------------------------------
const sendButton = document.getElementById("mail-letter-button")
const child = sendButton.children

function handleForm(event) {
    var v = document.getElementById("mail-letter-input")
    var val = v.value
    v.value=""
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

form.addEventListener("submit", event => handleForm(event))


//-------------------------------
//DROPDOWN MOBILE FOOTER
//-------------------------------
const dropButtonFoot = document.getElementsByClassName("foot-mobile");
const dropContainer = document.getElementsByClassName('container-help');

for(var i=0; i<dropButtonFoot.length;i++){
    dropButtonFoot[i].addEventListener("click",dropFooter.bind(null, i));
};

function dropFooter(i){
    var style = window.getComputedStyle(dropContainer[i].children[1]);
    if (style.getPropertyValue("height") === "0px"){
        dropContainer[i].children[1].style.height = "150px";
        // dropButtonFoot[i].children[1].innerHTML = minusSVG
        dropButtonFoot[i].children[2].children[1].style.transform = " rotateZ(90deg) scaleX(0.1)";

    } else {
        dropContainer[i].children[1].style.height = "0px";
        dropButtonFoot[i].children[2].children[1].style.transform = "scaleX(0)";
        dropButtonFoot[i].children[2].children[1].style.transform = "rotateZ(90deg) translateX(0px)";
        dropButtonFoot[i].children[2].children[1].style.opacity = "1";
    }
};

