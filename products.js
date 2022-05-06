const scrollable =  document.querySelectorAll(".card-product")
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
//------------------------EMAIL FORM FOOTER---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
const sendButton = document.getElementById("mail-letter-button")
const child = sendButton.children
// const animation0 = [
//     {left:"-100%"},
//     {left: "-100%"},
//     {left: "0%"}
// ];
// const animation1 = [
//     {left: "0%", bottom: "-100%"},
//     {left: "0", bottom: "0%"},
//     {left:"100%", bottom:"0%"}
// ];
// const animation2 = [
//     {top:"0%"},
//     {top:"100%"},
//     {top:"100%"},
// ];
// const animationTiming = {
//     duration: 3000,
//     iterations: 1,
//     }

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
    // child[0].animate(animation0, animationTiming)
    // child[1].animate(animation1, animationTiming)
    // child[2].animate(animation2, animationTiming)
}
const form = document.getElementById("form")
form.addEventListener("submit",function(event){
    handleForm(event)
}, null)


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-----------------------BUTTON MOBILE FOOTER-------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
const dropButtonFoot = document.getElementsByClassName("foot-mobile")
const dropContainer = document.getElementsByClassName('container-help')
var minusSVG =`
<svg width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 0V2H0V0H20Z" fill="black"/>
</svg>
`
var plusSVG = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="black"/>
</svg>
`
for(var i=0; i<dropButtonFoot.length;i++){
    dropButtonFoot[i].addEventListener("click",dropFooter.bind(null, i), null)
}
function dropFooter(i){
    var style = window.getComputedStyle(dropContainer[i].children[1])
    if (style.getPropertyValue("height") === "0px"){
        dropContainer[i].children[1].style.height = "150px"
        dropButtonFoot[i].children[1].innerHTML = minusSVG
    } else {
        dropContainer[i].children[1].style.height = "0px"
        dropButtonFoot[i].children[1].innerHTML = plusSVG

    }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------CLOSE NAV BANNER---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
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

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------GRID BUTTON-----------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
var sixColBtn = document.getElementById("grid-button-6-col")
var fourColBtn = document.getElementById("grid-button-4-col")
var grid = document.getElementsByClassName("grid-product")
var cardProduct = document.getElementsByClassName("card-product")
var numColoumn = 4
sixColBtn.addEventListener("click", toSixGrid, null)
fourColBtn.addEventListener("click", toFourGrid, null)

function toFourGrid () {
    fourColBtn.children[0].children[0].style.fill = "black"
    sixColBtn.children[0].children[0].style.fill = "#6B6B6B"
    grid[0].style.gridTemplateColumns = `repeat(4, 1fr)`

    for(var i = 0; i<cardProduct.length; i++) {
        cardProduct[i].style.height = `576px`
        cardProduct[i].style.marginBottom = `0px`
        cardProduct[i].style.gridTemplateRows= `2fr 1fr`
        cardProduct[i].children[0].style.height = `100%`
        cardProduct[i].children[1].style.display = `flex`
    }
    numColoumn = 4
    animateGrid(numColoumn)
}

function toSixGrid () {
    sixColBtn.children[0].children[0].style.fill = "black"
    fourColBtn.children[0].children[0].style.fill = "#6B6B6B"
    grid[0].style.gridTemplateColumns = `repeat(6, 1fr)`
    for (var i = 0; i<cardProduct.length; i++) {
        cardProduct[i].style.height = `200px`
        cardProduct[i].style.marginBottom = `67px`
        cardProduct[i].style.gridTemplateRows= `1fr`
        cardProduct[i].children[0].style.height = `100%`
        cardProduct[i].children[1].style.display = `none`
    }
    numColoumn = 6
    animateGrid(numColoumn)
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-----------------------ADD TO CART BUTTON---------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
cartButton = document.getElementsByClassName("add-to-cart-product")
function addToCart () {
    alert("item added to cart")
}
for(var i=0;i<cartButton.length;i++){
    cartButton[i].addEventListener("click", addToCart, null)
}
let addCart = function(event, i){
    addLocalStorage("product", i)
    alert(i, " added to cart")
    event.preventDefault()
    }


/////////
function elementIsVisible(el, threshold) {
    const elementTop = el.getBoundingClientRect().top;
    const c = (window.innerHeight || document.documentElement.clientHeight) / threshold
    return (
        elementTop <= c
    );
}
function animateGrid(numCol){
    for (var i = 0; i<numCol; i++) {
        scrollable[i].classList.add("opaque-card-product-rev")
        console.log(i)
        scrollable[i].style.animationDuration = `${numCol/2.5}s`
        scrollable[i].classList.remove("opaque-card-product-rev")
    }
    for (var i = 0; i<numCol; i++){
        scrollable[i].classList.remove("opaque-card-product-rev")
    }
}
window.addEventListener("scroll", handleScrollAnimation, null)
function handleScrollAnimation(){
    var num = 1
    for(var i = 0; i<scrollable.length; i++){
        if(elementIsVisible(scrollable[i], 0.9)){
            scrollable[i].classList.add("opaque-card-product-rev")
            // scrollable[i].style.animationDelay = `${num/10}s`
            scrollable[i].style.animationDuration = `${num/2.5}s`
        } else {
            scrollable[i].classList.remove("opaque-card-product-rev")
        }
        if (num===numColoumn){
            num=1
        } else {
            num++
        }    
    }
}