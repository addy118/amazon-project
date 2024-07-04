import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/header.js";
import {loadProducts, fetchProducts} from "../data/products.js";
import {loadBCart, fetchCart} from "../data/cart.js";
// import '../data/car.js';
// import '../data/backend-practice.js';


async function loadPage() {
	try {
		// throw 'error'
		await fetchProducts();
		
		await fetchCart().catch((error) => {
			console.log('Unexpected Error in Promise')
		})
	} catch {
		console.log('Unexpected Error in Synchronous Code')
	}

	renderCheckoutHeader()
	renderOrderSummary()
	renderPaymentSummary()
	
	console.log('async success')
}
loadPage()

// ex. 18i
await Promise.all([
	fetchProducts(),
	fetchCart()
])

// using Promises simultaneously
// Promise.all([
// 	fetchProducts().then(() => {
// 		fetch('https://supersimplebackend.dev/cart').then(response => {
// 			return response.text()
// 		}).then((cartResponse) => {
// 			console.log(`${cartResponse} by fetch()`)
// 		})
// 	}),
// 	new Promise(resolve => {
// 		loadProducts(() => {
// 			resolve();
// 		})
// 	}),
// 	new Promise(resolve => {
// 		loadBCart(() => {
// 			resolve();
// 		})
// 	})
//
// ]).then(() => {
// 	renderCheckoutHeader();
// 	renderOrderSummary();
// 	renderPaymentSummary();
// });

// using Promises one after the other
// new Promise(resolve => {
// 	loadProducts(() => {
// 		resolve();
// 	})
// }).then(() => {
// 	return new Promise(resolve => {
// 		loadBCart(() => {
// 			resolve();
// 		})
// 	})
// }).then(() => {
// 	renderCheckoutHeader();
// 	renderOrderSummary();
// 	renderPaymentSummary();
// })


// using CallBacks
// loadProducts(() => {
// 	loadBCart(() => {
// 		renderCheckoutHeader();
// 		renderOrderSummary();
// 		renderPaymentSummary();
// 	})
// })

// loadProducts()
// fetchCart()
