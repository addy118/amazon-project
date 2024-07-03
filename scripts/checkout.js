import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/header.js";
import {loadProducts} from "../data/products.js";
import {loadBCart} from "../data/cart.js";
// import '../data/car.js';
// import '../data/backend-practice.js';


// using Promises simultaneously
Promise.all([
	new Promise(resolve => {
		loadProducts(() => {
			resolve();
		})
	}),
	new Promise(resolve => {
		loadBCart(() => {
			resolve();
		})
	})
	
]).then(() => {
	renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
})

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
