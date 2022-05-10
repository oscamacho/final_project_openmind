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
            cardProduct[i].style.height = `200px`;
            cardProduct[i].style.marginBottom = `67px`;
            cardProduct[i].style.gridTemplateRows= `1fr`;
            cardProduct[i].children[0].style.height = `100%`;
            cardProduct[i].children[1].style.display = `none`;
        }
        numColoumn = 6;
        animateGrid(numColoumn)
    }
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
    btnBag.style.transform = `translate(50%, 0%) scale(1.5)`;
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