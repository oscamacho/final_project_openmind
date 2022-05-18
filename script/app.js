var imgs = document.querySelectorAll("img")

function loaded(i) {
  console.log('loaded', i)
}
for (i of imgs) {
    if (i.complete) {
        loaded(i)
      } else {
        i.addEventListener('load', loaded(i))
        i.addEventListener('error', function() {
            console.log('error')
        })
      }
}


//-------------------------------
//PARALLAX
//-------------------------------
// const image = document.getElementsByClassName("main-pics-container")[0].children[0].children[0];
const image = document.getElementById("main-image-id") 
// const image2 = document.getElementsByClassName("main-pics-container")[0].children[0].children[1];

function onMouseMove (event) {
    const target = event.currentTarget;
    const w = target.offsetWidth / 2;
    const h = target.offsetHeight / 2;
    var y = event.clientY - h;
    var x = event.clientX - w;
    image.style.filter = (`drop-shadow(${x/30-70}px ${y/30+30}px 4px var(--strawberry-color))`);
    image.style.transform = `translate(0px,${y/8}px)`;
    // image2.style.transform = `translate(0px,${-y/8}px)`
    // image.style.filter= `invert(50%)`;

}

image.addEventListener('mousemove', function (event) {
    onMouseMove(event);
  });
  // image2.addEventListener('mousemove', function (event) {
  //   onMouseMove(event);
  // });

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
        first.querySelector("a").classList.add("smooth-animation");
    } else {
        first.classList.remove("animation-card-div");
        first.style.transform = 'translateX(-20%)';
        first.querySelector("a").classList.remove("smooth-animation");
    }
    //soluzione 2 diminuisco la soglia di ingresso dell'animazione
    //a 0.98 facendo innescare precocemente l'animazione dove 0s {-20%}
    if (elementIsVisible(second, 0.98)) {
        second.classList.add("animation-card-div-rev");
        second.querySelector("a").classList.add("smooth-animation");
    } else {
        second.classList.remove("animation-card-div-rev");
        second.querySelector("a").classList.remove("smooth-animation");
    }
    //TODO: soluzione tre: smooth reentrancy
}