
const wish = `[{"id": 1, "amount": 1}, {"id": 2, "amount": 3}, {"id": 22, "amount": 33}]`

function addLocalStorage(id) {
    let wishlist = JSON.parse(wish)
    let isOnWish = wishlist.findIndex((e) => e.id === id)
    if (isOnWish>=0){
        wishlist[isOnWish].amount++
    }
    else {
        wishlist.push({"id": id, "amount": 1})
    }
    let str = JSON.stringify(wishlist)
    console.log(isOnWish) 
    console.log(wishlist, str, typeof(str))
    // localStorage.setItem("wishlist", wishlist)
}
addLocalStorage(22)