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
//COLUMN HANDLER BUTTON
//-------------------------------
const sixColBtn = document.getElementById("grid-button-6-col")
const fourColBtn = document.getElementById("grid-button-4-col")
const grid = document.getElementsByClassName("grid-product")
const cardProduct = document.getElementsByClassName("card-product")
var numColoumn = 4

sixColBtn.addEventListener("click", toSixGrid, null)
fourColBtn.addEventListener("click", toFourGrid, null)

function toFourGrid () {
    fourColBtn.children[0].children[0].style.fill = "black";
    sixColBtn.children[0].children[0].style.fill = "#6B6B6B";
    grid[0].style.gridTemplateColumns = `repeat(4, 1fr)`;

    for(var i = 0; i<cardProduct.length; i++) {
        cardProduct[i].style.height = `576px`;
        cardProduct[i].style.marginBottom = `0px`;
        cardProduct[i].style.gridTemplateRows= `2fr 1fr`;
        cardProduct[i].children[0].style.height = `100%`;
        cardProduct[i].children[1].style.display = `flex`;
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

//-------------------------------
//ADD TO CART BUTTON ANIMATION
//-------------------------------
const cartButton = document.getElementsByClassName("add-to-cart-product");
const productCardBody = document.getElementsByClassName("price-product");

for(const element of productCardBody){
    let productButton = element.lastElementChild;
    productButton.addEventListener("click",() => addToCart(element));
}

function addToCart (e) {
    let parent = e.parentNode
    let parentHeight = e.parentNode.clientHeight;
    // let parentPadding = window.getComputedStyle(e.parentNode).getPropertyValue('padding-bottom')
    let titleDesc = parent.children[0];
    let btnBag = e.lastElementChild;
    let svgCartDiv = document.createElement("span");
    parent.style.transition = `all 1s linear`;
    titleDesc.style.transition = `all .5s linear`;
    titleDesc.style.opacity = `0`;
    e.children[0].style.transition = `all .8s linear`;
    e.children[0].style.opacity = 0;
    setTimeout(() => {
        e.style.justifyContent = `center`;
        e.children[0].innerHTML=`
        <h5>
            ITEM ADDED TO 
            <a href="#" style="text-decoration: none; color: var(--strawberry-color)">
                CART
            </a>
        </h5>`;
        e.children[0].style.opacity = 1;
        svgCartDiv.classList.add("added-to-cart-span");
        btnBag.append(svgCartDiv);
    }, 1000);
    btnBag.style.transition = `all .6s linear`;
    btnBag.style.right = `50%`;
    btnBag.style.bottom=`${parentHeight/2-35}px`;
    btnBag.style.transform = `translate(50%, 0%) rotateY(180deg) scale(1.5)`;
}



//-------------------------------
//GRID ROWS ANIMATION
//-------------------------------
const scrollable =  document.querySelectorAll(".card-product")
/**
 * @param {object} el element reference
 * @param {number} threshold threshold of animation start before the appareance of element on screen
 */
function elementIsVisible(el, threshold) {
    const elementTop = el.getBoundingClientRect().top;
    const c = (window.innerHeight || document.documentElement.clientHeight) / threshold
    return (
        elementTop <= c
    );
};

/**
 * @param {number} numCol set the correct animation timing based on the number of coloumns 
 */
function animateGrid(numCol){
    for (let i = 0; i<numCol; i++) {
        scrollable[i].classList.add("opaque-card-product-rev")
        scrollable[i].style.animationDuration = `${numCol/2.5}s`
        scrollable[i].classList.remove("opaque-card-product-rev")
    }
    for (let i = 0; i<numCol; i++){
        scrollable[i].classList.remove("opaque-card-product-rev")
    }
} 
window.addEventListener("scroll", handleScrollAnimation, null)

function handleScrollAnimation(){
    var num = 1
    for(let i = 0; i<scrollable.length; i++){
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