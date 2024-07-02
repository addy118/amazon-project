class Cart {
	cartItems;
	#cartKey;
	#qtyKey;
	
	constructor(cartKey, qtyKey) {
		this.#cartKey = cartKey;
		this.#qtyKey = qtyKey;
		this.loadCart();
	}
	
	loadCart() {
		this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || []
	}
	
	cartQuantity = JSON.parse(localStorage.getItem('cartQty-oop')) || null;
	
	addToCart(productId) {
		const selectorElement = document.querySelector(`.js-quantity-selector-${productId}`)
		
		let matchingItem;
		this.cartItems.forEach(cartItem => {
			if (productId === cartItem.productId) {
				matchingItem = cartItem;
			}
		});
		
		if (matchingItem) {
			// matchingItem.quantity += Number(selectorElement.value)
			matchingItem.quantity += 1
		} else {
			this.cartItems.push({
				productId: productId,
				// quantity: Number(selectorElement.value),
				quantity: 1,
				deliveryOptionId: '1'
			})
		}
		localStorage.setItem(this.#cartKey, JSON.stringify(this.cartItems))
	}
	
	updateCartQuantity() {
		let cartQuantity = 0;
		this.cartItems.forEach(cartItem => {
			cartQuantity += cartItem.quantity
		})
		localStorage.setItem(this.#qtyKey, JSON.stringify(cartQuantity))
	}
	
	removeFromCart(productId) {
		let newCart = [], newCartQty = 0
		this.cartItems.forEach(cartItem => {
			if (productId !== cartItem.productId) {
				newCart.push(cartItem)
				newCartQty += cartItem.quantity
			}
		})
		this.cartItems = newCart
		this.cartQuantity = newCartQty
		this.saveToLocCart()
		localStorage.setItem(this.#qtyKey, JSON.stringify(this.cartQuantity))
	}
	
	updateQty(productId, newQuantity) {
		this.cartItems.forEach(cartItem => {
			if (cartItem.productId === productId) {
				cartItem.quantity = newQuantity
				document.querySelector(`.js-quantity-label-${productId}`)
					.innerHTML = `${cartItem.quantity}`
			}
			localStorage.setItem(this.#cartKey, JSON.stringify(this.cartItems))
		})
	}
	
	updateDeliveryOption(productId, deliveryOptionId) {
		let matchingItem;
		
		this.cartItems.forEach(cartItem => {
			if (productId === cartItem.productId) {
				matchingItem = cartItem;
			}
		})
		matchingItem.deliveryOptionId = deliveryOptionId;
		this.saveToLocCart()
	}
	
	saveToLocCart() {
		localStorage.setItem(this.#cartKey, JSON.stringify(this.cartItems))
	}
}

const cart = new Cart('cartOOP', 'qtyOOP');
const businessCart = new Cart('businessCart', 'businessQty')

console.log(cart)
console.log(businessCart)