import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {orders} from "../data/orders.js";
import {formatCurrency} from "./utils/money.js";
import {products, getProduct, fetchProducts} from "../data/products.js";

renderOrders()
async function renderOrders() {
	console.log('orders page initialized')
	let ordersHTML = '';
	
	for (const order of orders) {
		const orderedProducts = order.products;
		const orderDate = dayjs(`${order.orderTime}`).format('MMMM DD, HH:mm');
		
		const orderedProductsHTML = await renderOrderedProducts(orderedProducts)
		
		ordersHTML += `
			<div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid">
        	${orderedProductsHTML}
        </div>
      </div>
		`
		
		document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
		
		// console.log(order.id, formatCurrency(order.totalCostCents));
		// console.log(orderedProducts);
	}
	
	console.log('orders page rendered')
}


async function renderOrderedProducts(orderedProducts) {
	let productsHTML = '';
	
	for (const orderedProduct of orderedProducts) {
		// console.log(orderedProduct.productId)
		// console.log('order done')
		const arrivingDate = dayjs(`${orderedProduct.estimatedDeliveryTime}`).format('MMMM DD')
		// product.name and product.image
		const matchingItem = await getOrderedProduct(orderedProduct.productId)
		// console.log(matchingItem)
		
		productsHTML += `
				<div class="product-image-container">
		      <img src="${matchingItem.image}">
		    </div>
		
		    <div class="product-details">
		      <div class="product-name">
		        ${matchingItem.name}
		      </div>
		      <div class="product-delivery-date">
		        Arriving on: ${arrivingDate}
		      </div>
		      <div class="product-quantity">
		        Quantity: ${orderedProduct.quantity}
		      </div>
		      <button class="buy-again-button button-primary">
		        <img class="buy-again-icon" src="images/icons/buy-again.png">
		        <span class="buy-again-message">Buy it again</span>
		      </button>
		    </div>
		
		    <div class="product-actions">
		      <a href="tracking.html">
		        <button class="track-package-button button-secondary">
		          Track <package></package>
		        </button>
		      </a>
		    </div>
			`
	}
	return productsHTML;
}


async function getOrderedProduct(productId) {
	await fetchProducts();
	let matchingItem;
	products.forEach(product => {
		if (product.id === productId) {
			matchingItem = product;
		}
	});
	return matchingItem;
}

