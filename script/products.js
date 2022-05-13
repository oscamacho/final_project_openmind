//-------------------------------
//COLUMN HANDLER BUTTON
//-------------------------------
var numColoumn = 4;

(function() {
    const sixColBtn = document.getElementById("grid-button-6-col");
    const fourColBtn = document.getElementById("grid-button-4-col");
    const grid = document.getElementsByClassName("grid-product");
    const cardProduct = document.getElementsByClassName("card-product");
    
    sixColBtn.addEventListener("click", toSixGrid, null);
    fourColBtn.addEventListener("click", toFourGrid, null);
    
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
        sixColBtn.children[0].children[0].style.fill = "black";
        fourColBtn.children[0].children[0].style.fill = "#6B6B6B";
        grid[0].style.gridTemplateColumns = `repeat(6, 1fr)`;
        for (var i = 0; i<cardProduct.length; i++) {
            cardProduct[i].style.height = `calc(100vw/6)`;
            cardProduct[i].style.marginBottom = `67px`;
            cardProduct[i].style.gridTemplateRows= `1fr`;
            cardProduct[i].children[0].style.height = `100%`;
            cardProduct[i].children[1].style.display = `none`;
        }
        numColoumn = 6;
        animateGrid(numColoumn)
    }
    //controllo wishlist
    Array.from(cardProduct).forEach((el, i) => {
        let value = getCartFromLocalStorage(i)
        el.children[1].children[0].innerHTML = `${value}`
        console.log("ok")
    });
})()

//-------------------------------
//ADD TO CART BUTTON ANIMATION
//-------------------------------
const cartButton = document.getElementsByClassName("add-to-cart-product");
const productCardBody = document.getElementsByClassName("price-product");

for(const element of productCardBody){
    let productButton = element.lastElementChild;
    productButton.addEventListener("click",() => addToCart(element));
}

//-------------------------------
//GRID ROWS ANIMATION
//-------------------------------
const scrollable =  document.querySelectorAll(".card-product")
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

/**
 * 
 * @param {HTMLObject} e 
 */
function addToCart (e) {
    let cartSVG = `
    <svg width="24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    `
    let parent = e.parentNode
    // localStorage.removeItem("wishlist")
    // addToCartLocalStorage(1)
    remCartFromLocalStorage(1)
    let amountInWishlist = getCartFromLocalStorage(1)
    let parentSpanTop = document.createElement("span");
    let parentSpanBottom = document.createElement("span");
    parentSpanTop.classList.add("card-product-span-top")
    parentSpanBottom.classList.add("card-product-span-bottom")
    parent.append(parentSpanTop)
    parent.append(parentSpanBottom)
    e.children[0].style.opacity = 1;
    setTimeout(() => {
        parentSpanTop.style.top = `0%`;
        parentSpanBottom.style.bottom = `0%`;
        parentSpanBottom.innerHTML=`
        <h3> +1 </h3>
        ${cartSVG}
        `
        parentSpanTop.innerHTML = "<h2>ITEM ADDED</h2> <h2>TO CART </h2>"
    }, 200);
    setTimeout(() => {
        parentSpanTop.style.transform = `translateY(100%)`;
        parentSpanBottom.style.transform = `translateY(-100%)`;
        parent.children[0].innerHTML = `${amountInWishlist}`
    }, 2500)
    setTimeout(() => {
        parentSpanTop.remove()
        parentSpanBottom.remove()
    }, 3500)
}

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

//hard
const carousel = document.getElementsByClassName("carousel")
let windowW = window.innerWidth
const mid = (a, b) => {
    return (a + b)/2
} 
for(let i = 0; i<carousel[0].children.length; i++){
    let rect =  carousel[0].children[i].getBoundingClientRect()
    console.log(rect.left - windowW/2, "\n")
    if (Math.abs(mid(rect.left, rect.right) - windowW/2) < 200 ) {
        carousel[0].children[i].style.width = `150px`
    } else if(Math.abs(mid(rect.left, rect.right) - windowW/2) > 200) {
        carousel[0].children[i].style.transform = `rotateY(70deg)`
        carousel[0].children[i].style.opacity = .5

    } else {
        carousel[0].children[i].style.transform = `rotateY(45deg)`
        carousel[0].children[i].style.opacity = .7
    }
}


function addToCartLocalStorage(id) {
    let [isOnWish, arr] = getFromLocalStorage(id, "cart")
    console.log(arr)
    if(isOnWish === null){
        arr.push({"id": id, "amount": 1})
    } else {
        arr[isOnWish]["amount"]+=1
    }
    let strWishlist = JSON.stringify(arr)
    localStorage.setItem("cart", strWishlist)
}

function getFromLocalStorage(id, key){
    console.log(key)
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
function getCartFromLocalStorage(id){
    let [index, wishlist] = getFromLocalStorage(id, "cart");
    if (index !== null){
        console.log(wishlist[index]["amount"]);
        return wishlist[index]["amount"];
    }
    else return false
}
function remCartFromLocalStorage(id){
    let [isOnCart, arr] = getFromLocalStorage(id, "cart")
    console.log(arr)
    if(isOnCart !== null){
        console.log("null val")
        arr.splice(isOnCart, 1)
    }
    console.log(arr)
    let strCartList = JSON.stringify(arr)
    localStorage.setItem("cart", strCartList)
}

function getWishlistFromLocalStorage(id){
    let [index, wishlist] = getFromLocalStorage(id, "wishlist");
    if (index !== null){
        console.log(wishlist[index]["amount"]);
        return wishlist[index]["amount"];
    }
    else return false
}