export function renderCheckoutHeader() {
	document.querySelector('.js-checkout-header')
		.innerHTML = `
			<div class="header-content">
		    <div class="checkout-header-left-section">
		      <a href="index.html">
		        <img class="amazon-logo" src="images/amazon-logo.png" alt="">
		        <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png" alt="">
		      </a>
		    </div>
		
		    <div class="checkout-header-middle-section">
		      Checkout (<a class="return-to-home-link"
		        href="index.html">${JSON.parse(localStorage.getItem('cartQty')) || 0} items</a>)
		    </div>
		
		    <div class="checkout-header-right-section">
		      <img src="images/icons/checkout-lock-icon.png" alt="">
		    </div>
		  </div>
		`
}