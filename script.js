const CART_KEY = "greenHeavenCart";

export function getCart(){
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
