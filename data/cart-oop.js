function Cart(cartKey, qtyKey) {
	const cart = {
		cartItems: undefined,
		
		loadCart() {
			this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || []
		},
		
		cartQuantity: JSON.parse(localStorage.getItem('cartQty-oop')) || null,
		
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
			localStorage.setItem(cartKey, JSON.stringify(this.cartItems))
		},
		
		updateCartQuantity() {
			let cartQuantity = 0;
			this.cartItems.forEach(cartItem => {
				cartQuantity += cartItem.quantity
			})
			localStorage.setItem(qtyKey, JSON.stringify(cartQuantity))
		},
		
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
			localStorage.setItem(qtyKey, JSON.stringify(this.cartQuantity))
		},
		
		updateQty(productId, newQuantity) {
			this.cartItems.forEach(cartItem => {
				if (cartItem.productId === productId) {
					cartItem.quantity = newQuantity
					document.querySelector(`.js-quantity-label-${productId}`)
						.innerHTML = `${cartItem.quantity}`
				}
				localStorage.setItem(cartKey, JSON.stringify(this.cartItems))
			})
		},
		
		updateDeliveryOption(productId, deliveryOptionId) {
			let matchingItem;
			
			this.cartItems.forEach(cartItem => {
				if (productId === cartItem.productId) {
					matchingItem = cartItem;
				}
			})
			matchingItem.deliveryOptionId = deliveryOptionId;
			this.saveToLocCart()
		},
		
		saveToLocCart() {
			localStorage.setItem(cartKey, JSON.stringify(this.cartItems))
		}
	}
	cart.loadCart()
	
	return cart;
}

const cart = Cart('cartOOP', 'qtyOOP')
console.log(cart)
