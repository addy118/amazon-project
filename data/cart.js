// import {products} from "./products";

export let cart;
loadCart()
export function loadCart() {
	cart = JSON.parse(localStorage.getItem('cart')) || []
}
export let cartQuantity = JSON.parse(localStorage.getItem('cartQty')) || null

export function addToCart(productId) {
	const selectorElement = document.querySelector(`.js-quantity-selector-${productId}`)
	
	// let matchingItem = getProduct(productId)     // we need to get the product from the cart array not from the products array
	let matchingItem;
	cart.forEach(cartItem => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});
	
	if (matchingItem) {
		matchingItem.quantity += Number(selectorElement.value)
	} else {
		cart.push({
			productId: productId,
			quantity: Number(selectorElement.value),
			deliveryOptionId: '1'
		})
	}
	localStorage.setItem('cart', JSON.stringify(cart))
}


export function updateCartQuantity() {
	let cartQuantity = 0;
	cart.forEach(cartItem => {
		cartQuantity += cartItem.quantity
	})
	localStorage.setItem('cartQty', JSON.stringify(cartQuantity))
}


export function removeFromCart(productId) {
	let newCart = [], newCartQty = 0
	cart.forEach(cartItem => {
		if (productId !== cartItem.productId) {
			newCart.push(cartItem)
			newCartQty += cartItem.quantity
		}
	})
	cart = newCart
	cartQuantity = newCartQty
	saveToLocCart()
	localStorage.setItem('cartQty', JSON.stringify(cartQuantity))
}


export function updateQty(productId, newQuantity) {
	cart.forEach(cartItem => {
		if (cartItem.productId === productId) {
			cartItem.quantity = newQuantity
			document.querySelector(`.js-quantity-label-${productId}`)
				.innerHTML = `${cartItem.quantity}`
		}
		localStorage.setItem('cart', JSON.stringify(cart))
	})
}

export function updateDeliveryOption(productId, deliveryOptionId) {
	let matchingItem;
	
	cart.forEach(cartItem => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	})
	matchingItem.deliveryOptionId = deliveryOptionId;
	saveToLocCart()
}


function saveToLocCart() {
	localStorage.setItem('cart', JSON.stringify(cart))
}

export function loadBCart(func) {
	const xhr = new XMLHttpRequest()

	xhr.addEventListener('load', () => {
		console.log(xhr.response)
		func()
	})

	xhr.open('GET', 'https://supersimplebackend.dev/cart')
	xhr.send()
}


// ex. 18h
export async function fetchCart() {
	const response = await fetch('https://supersimplebackend.dev/cart')
	const cart = await response.text()
	console.log(`fetchCart(): ${cart}`)
}