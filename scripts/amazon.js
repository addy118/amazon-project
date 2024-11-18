import { products, loadProducts } from '../data/products.js';
import cart from '../data/cartClass.js';

loadProducts(renderHomepage);

function renderHomepage() {
	document.querySelector('.js-cart-quantity').innerHTML = `${JSON.parse(localStorage.getItem('cartQty')) || 0}`
	products.forEach((product) => {
		document.querySelector('.js-product-grid').innerHTML += `
			<div class="product-container">
		    <div class="product-image-container">
		      <img class="product-image"
		        src="${product.image}" alt="">
		    </div>
		
		    <div class="product-name limit-text-to-2-lines">
		      ${product.name}
		    </div>
		
		    <div class="product-rating-container">
		      <img class="product-rating-stars"
		        src="${product.getRatingURL()}" alt="">
		      <div class="product-rating-count link-primary">
		        ${product.rating.count}
		      </div>
		    </div>
		
		    <div class="product-price">
		      ${product.getProductPrice()}
		    </div>
		
		    <div class="product-quantity-container">
		      <select class="js-quantity-selector-${product.id}">
		        <option selected value="1">1</option>
		        <option value="2">2</option>
		        <option value="3">3</option>
		        <option value="4">4</option>
		        <option value="5">5</option>
		        <option value="6">6</option>
		        <option value="7">7</option>
		        <option value="8">8</option>
		        <option value="9">9</option>
		        <option value="10">10</option>
		      </select>
		    </div>
		    
		    ${product.extraInfoHTML()}
		
		    <div class="product-spacer"></div>
		
		    <div class="added-to-cart js-added-to-cart-${product.id}">
		      <img src="images/icons/checkmark.png" alt="">
		      Added
		    </div>
		
		    <button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id="${product.id}" data-product-name="${product.name}">
		      Add to Cart
		    </button>
		  </div>
		`
	})

	// object of all the individual products' timeouts
	const addedMessageTimeouts = {}

	function showAddedAnimation(productId) {
		document.querySelector(`.js-added-to-cart-${productId}`)
			.classList.add('js-show-added-to-cart')

		const prevTimeoutId = addedMessageTimeouts[productId]
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId)
		}
		addedMessageTimeouts[productId] = setTimeout(() => {
			document.querySelector(`.js-added-to-cart-${productId}`)
				.classList.remove('js-show-added-to-cart')
		}, 2000)

		// for deferred execution setTimeout() is used w/o delay
		// deferred execution is similar to putting the particular code at the end for execution
		// setTimeout(() => {
		// 	const prevTimeoutId = addedMessageTimeouts[productId]
		// 	if (prevTimeoutId) {
		// 		clearTimeout(prevTimeoutId)
		// 	}
		// 	const timeoutId = setTimeout(() => {
		// 		document.querySelector(`.js-added-to-cart-${productId}`)
		// 			.classList.remove('js-show-added-to-cart')
		// 	}, 2000)
		// 	addedMessageTimeouts[productId] = timeoutId
		// })
	}

	// here, the 'button' param in for.each((button) =>) represents a single add to cart button
	document.querySelectorAll('.js-add-to-cart-button')
		.forEach((button) => {
			button.addEventListener('click', () => {
				const { productId } = button.dataset;
				showAddedAnimation(productId)
				cart.addToCart(productId)
				cart.updateCartQuantity()
				document.querySelector('.js-cart-quantity')
					.innerHTML = JSON.parse(localStorage.getItem('cartQty'))
			});
		});
}