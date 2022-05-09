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
closeBannerButton.addEventListener("click", closeBannerHandler, null)

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
//MOBILE DROP FOOTER
//-------------------------------
const dropButtonFoot = document.getElementsByClassName("foot-mobile")
const dropContainer = document.getElementsByClassName('container-help')

for(var i=0; i<dropButtonFoot.length;i++){
    dropButtonFoot[i].addEventListener("click",dropFooter.bind(null, i))
}
function dropFooter(i){
    var style = window.getComputedStyle(dropContainer[i].children[1])
    if (style.getPropertyValue("height") === "0px"){
        dropContainer[i].children[1].style.height = "150px"
        dropButtonFoot[i].children[2].children[1].style.transform = " rotateZ(90deg) scaleX(0.1)"
    } else {
        dropContainer[i].children[1].style.height = "0px"
        dropButtonFoot[i].children[2].children[1].style.transform = "scaleX(0)"
        dropButtonFoot[i].children[2].children[1].style.transform = "rotateZ(90deg) translateX(0px)"
        dropButtonFoot[i].children[2].children[1].style.opacity = "1"
    }
}

//-------------------------------
//HEART ADD TO WISHLIST
//-------------------------------
// sample implementation of query with LocalStorage
var heartButton = document.getElementsByClassName("heart-item-button")
var heartPath = document.getElementById("heart-svg-path")
var isActive = getLocalStorage("wishList")

heartButton[0].addEventListener("click", handleClickHeart)

function checkLocalWishList() {
    if (isActive) {
        heartButton[0].style.background = "rgb(187, 48, 82)"
        heartButton[0].style.transform="rotateY(180deg)"  
    }
}

function handleClickHeart() {
    if (isActive) {
        heartButton[0].children[0].classList.remove("toggle-heart-animation")
        removeLocalStorage("wishList")
        heartPath.style.fill = "white"
        heartButton[0].style.background = "black"
        heartButton[0].style.transform="rotateY(0deg)"  
    } else {
        heartButton[0].children[0].classList.add("toggle-heart-animation")
        addLocalStorage("wishList", "#")
        heartButton[0].style.background = "rgb(187, 48, 82)"  
        console.log(getLocalStorage("wishList"))
        heartButton[0].style.transform="rotateY(180deg)"
    }
    heartButton[0].style.transition="all 0.5s linear"
    isActive = !isActive 
}

checkLocalWishList()

//-------------------------------
//DROPDOWN COMPONENTS
//-------------------------------
const dropButtonList = document.getElementsByClassName("dropdown-body")
const dropContentList = document.getElementsByClassName('dropdown-content')
var animationDrop = [{
    transform: "rotateZ(90deg) translateX(-100%)", 
    opacity: "0"
}]

const animationTime = {
    duration: 2300,
    iterations: 3,
}

for(var i=0;i<dropButtonList.length;i++){
    dropButtonList[i].addEventListener('click', toDropContent.bind(null, i))
}

function toDropContent(i) {
    var style = window.getComputedStyle(dropContentList[i])
    var symbolDrop = dropButtonList[i].children[2].children[1] 
    if (style.getPropertyValue("height") === "0px"){
        dropContentList[i].style.height = "200px"
        symbolDrop.style.transform = " rotateZ(90deg) scaleX(0.1)"
    } else {
        dropContentList[i].style.height = "0px"
        symbolDrop.style.transform = "scaleX(0)"
        symbolDrop.style.transform = "rotateZ(90deg) translateX(0px)"
        symbolDrop.style.opacity = "1"
    }
}

//-------------------------------
//ADD TO CART BTN
//-------------------------------
function numInCart () {
   return getLocalStorage("0")
}
cartButton = document.getElementsByClassName("add-to-cart")
var p = document.createElement("h4");
const newContent = document.createTextNode(1);
const shopBag = cartButton[0].children[2].children[1].children[0]
p.appendChild(newContent)
cartButton[0].addEventListener("click", addToCart, null)

function addToCart () {
    const id = 0
    const animation0 = [
        {left:"-100%", top: "100%"},
        {left: "0%"},
        {left: "0%"},
        {left: "0%", top:"100%"},
        {left: "0%", top:"0%"}
    ];
    const animation1 = [
        {left:"-100%", top: "0%"},
        {left: "0%"},
        {left: "0%"},
        {left: "0%", top: "0%"},
        {left:"0%", top:"-100%"}
    ];
    const animation2 = [
        {left:"0%"},
        {left: "100%"},
        {left: "100%"},
        {left: "100%"},
        {left:"200%"}
    ];
        
        const animationTiming = {
        duration: 2300,
        iterations: 1,
        }
        const nodes = cartButton[0].children
        nodes[0].animate(animation0, animationTiming)
        nodes[1].animate(animation1, animationTiming)
        nodes[2].animate(animation2, animationTiming)
        addLocalStorage(`item`, "1")

}

//---------------------------
//IMAGE HANDLER AND MAGNIFY
//---------------------------
const lent = document.getElementsByClassName("lent")

//image zoom
var imagesContainer = document.getElementById("image-grid")

function onMouseOutImage(element) {
    element.children[0].style.transform = `none`
    element.children[0].addEventListener('mousemove', onMove, false);
    console.log(element)
}

const handleRemoveMove = (element) => {
    element.children[0].style.transform = `translate(0px, 0px)`
    element.children[0].removeEventListener("mousemove", onMove, false)
    console.log("onmoved", element)
}

const onMove = (e) => {
    var target = e.currentTarget
    var w = target.offsetWidth / 2
    var h = target.offsetHeight / 2
    var x = e.offsetX - w
    var y = e.offsetY - h;
    let xx = w-e.offsetX
    let yy = h-e.offsetY 
    // lent[0].style.transition = `none`
    // lent[0].style.transform=`translate(${x-150}px, ${y-150}px)`
    // lent[0].style.backgroundSize = `${w*3}px ${h*3}px`
    // lent[0].style.backgroundPosition = `bottom ${y}px right ${x}px`
    target.style.transform = `translate(${x}px, ${y}px) scale(1.5, 1.5)`
}

for (const element of imagesContainer.children){
    element.children[0].addEventListener('mousemove', onMove, false);
    element.children[0].addEventListener('mouseout', () => onMouseOutImage(element));
    element.children[0].addEventListener("click", () => handleRemoveMove(element));
}
