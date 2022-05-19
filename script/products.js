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

        grid[0].style.gridTemplateColumns = `repeat(4, auto)`;
    
        for(var i = 0; i<cardProduct.length; i++) {
            cardProduct[i].style.height = `auto`;
            cardProduct[i].style.marginBottom = `0px`;
            cardProduct[i].style.gridTemplateRows= `calc(100vw/4) calc(100vw/7)`;

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
    Array.from(cardProduct).forEach((el, i) => {
        let valueCart = getCartFromLocalStorage(i);
        let [valueWishlist, _] = getWishFromLocalStorage(parseInt(el.id))
        
        if (valueCart) {
            let isOnCartP = document.createElement("p");
            isOnCartP.classList.add("product-is-on-cart");
            isOnCartP.innerHTML = `${valueCart} item in your cart`;
            el.children[1].append(isOnCartP);
        }

        if (valueWishlist>=0 && valueWishlist !== null) {
            el.querySelector("path").style.fill = "var(--strawberry-color)"
        }
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
//ADD TO CART BUTTON ANIMATION
//-------------------------------
const heartButtons = document.getElementsByClassName("add-to-wishlist")
for(let heart of heartButtons){
    heart.addEventListener("click", () => {
        addToWishlistLocalStorage(JSON.parse(parseInt(heart.parentNode.parentNode.id)), heart)
    })
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
 * @param {number} numCol set the correct animation timing based on the number of columns 
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
 * @param {HTMLObject} e element reference
 * the function add +1 to the product clicked in the cart saved in localstorage,
 * and triggered the animation
 */
function addToCart (e) {
    let cartSVG = `
    <svg width="24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    `
    let parent = e.parentNode;
    let productCardID = parseInt(parent.parentNode.id)

    addToCartLocalStorage(productCardID)

    let amountInCart = getCartFromLocalStorage(parseInt(parent.parentNode.id))

    let parentSpanTopTop = document.createElement("span");
    let parentSpanTopBottom = document.createElement("span");
    let parentSpanBottomBottom = document.createElement("span");
    let parentSpanBottomTop = document.createElement("span");

    parentSpanTopTop.classList.add("card-product-span-top-top")
    parentSpanTopBottom.classList.add("card-product-span-top-bottom")
    parentSpanBottomTop.classList.add("card-product-span-bottom-top")
    parentSpanBottomBottom.classList.add("card-product-span-bottom-bottom")

    parent.append(parentSpanTopTop)
    parent.append(parentSpanBottomBottom)
    parent.append(parentSpanTopBottom)
    parent.append(parentSpanBottomTop)

    e.children[0].style.opacity = 1;
    setTimeout(() => {
        parentSpanTopTop.style.transform = `translateY(0%)`;
        parentSpanTopBottom.style.transform=`translateY(0%)`;
        parentSpanBottomBottom.style.transform=`translateY(0%)`;
        parentSpanBottomTop.style.transform=`translateY(0%)`;

        parentSpanBottomTop.innerHTML=`<h4> +1 </h4>`;
        parentSpanBottomBottom.innerHTML=`${cartSVG}`;
        parentSpanTopTop.innerHTML = "<h4>ITEM ADDED</h4>";
        parentSpanTopBottom.innerHTML="<h4>TO CART </h4>";
    }, 200);
    setTimeout(() => {
        if (amountInCart > 1){
            parent.children[2].innerHTML = `${amountInCart} items in your cart`
        } else {
            let isOnCartP = document.createElement("p");
            isOnCartP.classList.add("product-is-on-cart");
            isOnCartP.innerHTML = `1 item in your cart`;

            parent.append(isOnCartP);
        }
        parentSpanTopTop.style.transform = `translateX(-200%)`;
        parentSpanTopBottom.style.transform = `translateX(200%)`;
        parentSpanBottomBottom.style.transform = `translateX(200%)`;
        parentSpanBottomTop.style.transform = `translateX(-200%)`;
    }, 2500);
    setTimeout(() => {
        parentSpanTopTop.remove();
        parentSpanTopBottom.remove();
        parentSpanBottomBottom.remove();
        parentSpanBottomTop.remove();
    }, 4500);
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
/**
 * @param {Number} id id field of the object stored in the array
 * @returns the index of the requestes object in the array and the array itself
 * or return null and array if object is not found and empty array 
 * if localstorage haven't wishlist saved 
 */
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


/**
 * @param {Number} id 
 * @returns return the amount of the specific ids product in localstorage
 *  or return false if the product is not found 
 */
function getCartFromLocalStorage(id){
    let [index, wishlist] = getFromLocalStorage(id, "cart");
    if (index !== null){
        return wishlist[index]["amount"];
    }
    else return false
}

/**
 * @param {Number} id remove the specific id object from the cart in localstorage
 */
function remCartFromLocalStorage(id){
    let [isOnCart, arr] = getFromLocalStorage(id, "cart")
    if(isOnCart !== null){
        arr.splice(isOnCart, 1)
    }
    let strCartList = JSON.stringify(arr)
    localStorage.setItem("cart", strCartList)
}

/**
 * @param {Number} id 
 * @returns return the index of item in wishlist or false if there aren't
 */
function getWishlistFromLocalStorage(id){
    let [index, wishlist] = getFromLocalStorage(id, "wishlist");
    console.log("index", index, wishlist)
    if (index !== null){
        return wishlist[index];
    }
    else return false
}


function addToWishlistLocalStorage(id, e) {
    let [isOnWish, arr] = getWishFromLocalStorage(id)
    console.log(isOnWish, arr)
    if (isOnWish !== null){
        arr.splice(isOnWish, 1);
        e.querySelector("path").style.fill = `black`
    } else {
        arr.push(id)
        e.querySelector("path").style.fill = `var(--strawberry-color)`
    }
    let strWishlist = JSON.stringify(arr)
    localStorage.setItem("wishlist", strWishlist)
}



// //hard
// const carousel = document.getElementsByClassName("carousel")
// let windowW = window.innerWidth
// const mid = (a, b) => {
//     return (a + b)/2
// } 
// for(let i = 0; i<carousel[0].children.length; i++){
//     let rect =  carousel[0].children[i].getBoundingClientRect();
//     console.log(rect.left - windowW/2, "\n");
//     if (Math.abs(mid(rect.left, rect.right) - windowW/2) < 200 ) {
//         carousel[0].children[i].style.width = `150px`;
//     } else if(Math.abs(mid(rect.left, rect.right) - windowW/2) > 200) {
//         carousel[0].children[i].style.transform = `rotateY(70deg)`;
//         carousel[0].children[i].style.opacity = .5;

//     } else {
//         carousel[0].children[i].style.transform = `rotateY(45deg)`;
//         carousel[0].children[i].style.opacity = .7;
//     }
// };