//for sample to not use hash routing or copycat 16 item.html i use product id = 0
const productID = 0
//-------------------------------
//HEART ADD TO WISHLIST
//-------------------------------
// sample implementation of query with LocalStorage
const heartButton = document.querySelector(".heart-item-button")
const heartButtonSmallScreen = document.querySelector(".image-heart")
const heartPath = document.getElementById("heart-svg-path")
const itemInCart = document.querySelector(".item-in-cart").children[0];
let [isActive, _] = getWishFromLocalStorage(productID)
let isInCar = getCartFromLocalStorage(productID)

if(isActive){
    heartButton.children[0].classList.add("toggle-heart-animation")
    heartButton.style.background = "rgb(187, 48, 82)"  
    heartButton.style.transform="rotateY(180deg)";
    heartButtonSmallScreen.querySelector("path").style.fill = "rgb(187, 48, 82)";
}

heartButton.addEventListener("click", handleClickHeart)
heartButtonSmallScreen.addEventListener("click", handleClickHeart)

if (isActive) {
    heartButton.style.background = "rgb(187, 48, 82)"
    heartButton.style.transform="rotateY(180deg)"  
}
if (isInCar){
    itemInCart.innerHTML = `${isInCar} items in cart`
}

function handleClickHeart() {
    if (isActive) {
        heartButton.children[0].classList.remove("toggle-heart-animation")
        heartPath.style.fill = "white"
        heartButton.style.background = "black"
        heartButton.style.transform="rotateY(0deg)";
        heartButtonSmallScreen.querySelector("path").style.fill = "black";

    } else {
        heartButton.children[0].classList.add("toggle-heart-animation")
        heartButton.style.background = "rgb(187, 48, 82)"  
        heartButton.style.transform="rotateY(180deg)";
        heartButtonSmallScreen.querySelector("path").style.fill = "rgb(187, 48, 82)";
    }
    addToWishlistLocalStorage(productID)
    heartButton.style.transition="all 0.5s linear"
    isActive = !isActive 
}

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

Array.from(dropButtonList).forEach((e, i)=> {
    e.addEventListener('click', toDropContent.bind(null, i))
})
function toDropContent(i) {
    var style = window.getComputedStyle(dropContentList[i])
    var symbolDrop = dropButtonList[i].querySelectorAll("span")[1]
    console.log(symbolDrop)
    if (style.getPropertyValue("height") === "0px"){
        dropContentList[i].style.height = "200px";
        symbolDrop.style.transform = " rotateZ(90deg) scaleX(0.1)";
    } else {
        dropContentList[i].style.height = "0px";
        symbolDrop.style.transform = "scaleX(0)";
        symbolDrop.style.transform = "rotateZ(90deg) translateX(0px)";
        symbolDrop.style.opacity = "1";
    }
}

//-------------------------------
//ADD TO CART BTN
//-------------------------------
let cartButton = document.getElementsByClassName("add-to-cart");
var p = document.createElement("h4");
const newContent = document.createTextNode(1);
const shopBag = document.getElementsByClassName("add-to-cart-section")[0].querySelector("span");
console.log(shopBag)
p.appendChild(newContent)
cartButton[0].addEventListener("click", addToCart, null)

function addToCart () {
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
        duration: 3800,
        iterations: 1,
        }
        const nodes = cartButton[0].children
        nodes[0].animate(animation0, animationTiming)
        nodes[1].animate(animation1, animationTiming)
        nodes[2].animate(animation2, animationTiming)
        addToCartLocalStorage(productID)
        isInCar++
        itemInCart.innerHTML = `${isInCar} items in cart`
}

//---------------------------
//IMAGE HANDLER AND MAGNIFY
//---------------------------

//image zoom
let imagesContainer = document.getElementById("image-grid")


function onMouseOutImage(element) {
    element.style.transform = `none`
    element.addEventListener('mousemove', onMove, false);
    console.log(element)
}

const handleRemoveMove = (element) => {
    element.style.transform = `translate(0px, 0px)`
    element.removeEventListener("mousemove", onMove, false)
    console.log("onmoved", element)
}

const onMove = (e) => {
    var target = e.currentTarget
    var w = target.offsetWidth / 2
    var h = target.offsetHeight / 2
    var x = e.offsetX - w
    var y = e.offsetY - h;
    target.style.transform = `translate(${x}px, ${y}px) scale(1.7, 1.7)`
}

for (const element of imagesContainer.querySelectorAll("img")){
    element.addEventListener('mousemove', onMove, false);
    element.addEventListener('mouseout', () => onMouseOutImage(element));
    element.addEventListener("click", () => handleRemoveMove(element));
}

//-------------------------------
//LOCAL STORAGE
//-------------------------------

/**
 * 
 * @param {Number} id increment of 1 the amount of the specific id product in the localstorage
 */
 function addToCartLocalStorage(id) {
    let [isOnWish, arr] = getFromLocalStorage(id, "cart")
    if(isOnWish === null){
        arr.push({"id": id, "amount": 1})
    } else {
        arr[isOnWish]["amount"]+=1
    }
    let strWishlist = JSON.stringify(arr)
    localStorage.setItem("cart", strWishlist)
}

/**
 * @param {Number} id id field of the object stored in the array
 * @param {String} key key of the localstorage
 * @returns the index of the requestes object in the array and the array itself
 *  or return null and empty array if the object with the specified id is not found 
 */
function getFromLocalStorage(id, key){
    let res = localStorage.getItem(key);
    if (res) {
        let resList = JSON.parse(res);
        let isOnList = resList.findIndex((e) => {
            return e.id === id;
        })
        if(isOnList >= 0){
            return [isOnList, resList];
        } else {
            return [null, resList];
        }
    }
    else {
        return [null, []];
    }
}


function getWishFromLocalStorage(id){
    let res = localStorage.getItem("wishlist");
    if (res) {
        let resList = JSON.parse(res);
        let isOnList = resList.findIndex((e) => {
           return e === id
        })
        if(isOnList>=0){
            return [isOnList, resList];
        } else {
            return [null, resList];
        }
    }
    else {
        return [null, []];
    }
}

function getCartFromLocalStorage(id){
    let [index, wishlist] = getFromLocalStorage(id, "cart");
    if (index !== null){
        return wishlist[index]["amount"];
    }
    else return false
}

function getWishlistFromLocalStorage(id){
    let [index, wishlist] = getFromLocalStorage(id, "wishlist");
    console.log("index", index, wishlist)
    if (index !== null){
        return wishlist[index];
    }
    else return false
}


function addToWishlistLocalStorage(id) {
    let [isOnWish, arr] = getWishFromLocalStorage(id)
    console.log(isOnWish, arr)
    if (isOnWish !== null){
        arr.splice(isOnWish, 1);
    } else {
        arr.push(id)
    }
    let strWishlist = JSON.stringify(arr)
    localStorage.setItem("wishlist", strWishlist)
}

