import { getProduct } from '../../data/products.js';
import cart from '../../data/cartClass.js'
import { formatCurrency } from "../utils/money.js";
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from "./paymentSummary.js";
import {renderCheckoutHeader} from "./header.js";


export function renderOrderSummary() {
	
	// console.group('Exercise 15')
	// const today = dayjs();
	// const afterFiveDays = today.add(5, 'day')
	// console.log(afterFiveDays.format('MMMM DD'))
	// console.log(today.add(1, 'month').format('MMMM DD'))
	// console.log(today.subtract(1, 'month').format('MMMM DD'));
	// console.log(today.format('dddd'))
	//
	// isSatSun(today)
	// isSatSun(today.add(5, 'day'))
	// isSatSun(today.add(6, 'day'))
	// isSatSun(today.add(7, 'day'))
	// console.groupEnd()
	
	// document.querySelector('.return-to-home-link').innerHTML = `${JSON.parse(localStorage.getItem('cartQty'))} items`
	let cartSummaryHTML = ''
	
	cart.cartItems.forEach(cartItem => {
		const productId = cartItem.productId;
		const matchingProduct = getProduct(productId);
		
		const deliveryOptionId = cartItem.deliveryOptionId;
		const deliveryOption = getDeliveryOption(deliveryOptionId)
		const dateString = calculateDeliveryDate(deliveryOption)
		
		cartSummaryHTML += `
			<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
		    <div class="delivery-date">
			    Delivery Date: ${dateString}
			  </div>
			
			  <div class="cart-item-details-grid">
			    <img class="product-image" src="${matchingProduct.image}" alt="">
			
			    <div class="cart-item-details">
			      <div class="product-name">
			        ${matchingProduct.name}
			      </div>
			      <div class="product-price">
			        ${matchingProduct.getProductPrice()}
			      </div>
			      <div class="product-quantity">
			        <span>
			          Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
			        </span>
			        <span class="update-quantity-link link-primary js-update-button" data-product-id="${matchingProduct.id}">
			          Update
			        </span>
			        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
			        <span class="save-quantity-link link-primary js-save-button" data-product-id="${matchingProduct.id}">
			        	Save
			        </span>
			        <span class="delete-quantity-link link-primary js-delete-button" data-product-id="${matchingProduct.id}">
			          Delete
			        </span>
			      </div>
			    </div>
			
			    <div class="delivery-options">
			      <div class="delivery-options-title">
			        Choose a delivery option:
			      </div>
			      ${deliveryDetailsHTML(matchingProduct, cartItem)}
			    </div>
			  </div>
		  </div>
		`
	})
	
	// it should return the html for delivery options
	function deliveryDetailsHTML(matchingProduct, cartItem) {
		let html = '';
		
		deliveryOptions.forEach(deliveryOption => {
			const dateString = calculateDeliveryDate(deliveryOption);
			
			const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`
			
			const isChecked = deliveryOption.id === cartItem.deliveryOptionId
			
			html += `
				<div class="delivery-option js-delivery-option"
					data-product-id="${matchingProduct.id}"
					data-delivery-option-id="${deliveryOption.id}">
	        <input type="radio"
	        	${isChecked ? 'checked' : ''}
	          class="delivery-option-input"
	          name="delivery-option-${matchingProduct.id}">
	        <div>
	          <div class="delivery-option-date">
	            ${dateString}
	          </div>
	          <div class="delivery-option-price">
	            ${priceString} - Shipping
	          </div>
	        </div>
	      </div>
			`
		})
		return html;
	}
	document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
	
	document.querySelectorAll('.js-delete-button')
		.forEach(deleteButton => {
			deleteButton.addEventListener('click', () => {
				const {productId} = deleteButton.dataset
				cart.removeFromCart(productId)
				// const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`)
				// cartItemContainer.remove()
				renderOrderSummary()    // used mvc instead of dom (above two lines)
				renderPaymentSummary()
				
				// below code belongs to the amazon.html file, so it will show "cannot set properties to null" error
				// document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
				// document.querySelector('.return-to-home-link').innerHTML = `${JSON.parse(localStorage.getItem('cartQty'))} items`
				renderCheckoutHeader()
			})
		})
	
	document.querySelectorAll('.js-update-button')
		.forEach(updateButton => {
			updateButton.addEventListener('click', () => {
				const {productId} = updateButton.dataset
				document.querySelector(`.js-cart-item-container-${productId}`)
					.classList.add('is-editing-quantity')
			})
		})
	
	document.querySelectorAll('.js-save-button')
		.forEach(saveButton => {
			saveButton.addEventListener('click', () => {
				const {productId} = saveButton.dataset
				document.querySelector(`.js-cart-item-container-${productId}`)
					.classList.remove('is-editing-quantity')
				
				const qtyInputElement = document.querySelector(`.js-quantity-input-${productId}`)
				const newQty = Number(qtyInputElement.value)
				
				// the following method used for validation is called early return
				if (newQty < 1 || newQty > 1000) {
					alert('Quantity must be at least 1 and less than 1000')
					return
				}
				
				cart.updateQty(productId, newQty)
				cart.updateCartQuantity()
				renderOrderSummary()
				renderPaymentSummary()
				// document.querySelector('.return-to-home-link').innerHTML = `${JSON.parse(localStorage.getItem('cartQty'))} items`
				renderCheckoutHeader()
				
				// if (newQty >= 0 && newQty < 1000) {
				// 	updateQty(productId, newQty)
				// 	updateCartQuantity()
				// 	document.querySelector('.return-to-home-link')
				// 		.innerHTML = `${JSON.parse(localStorage.getItem('cartQty'))} items`
				// }
			})
		})
	
	document.querySelectorAll('.js-delivery-option')
		.forEach(element => {
			element.addEventListener('click', () => {
				const {productId, deliveryOptionId} = element.dataset;
				cart.updateDeliveryOption(productId, deliveryOptionId);
				renderOrderSummary();
				renderPaymentSummary();
			});
		});
}
