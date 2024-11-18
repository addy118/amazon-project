import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/header.js";
import { fetchProducts } from "../data/products.js";
import { fetchCart } from "../data/cart.js";

async function loadPage() {
  try {
    await fetchProducts();

    await fetchCart().catch(error => {
      throw new Error("Unexpected Error in Promise");
    });
  } catch {
    throw new Error("Unexpected Error in Synchronous Code");
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

  // console.log("async success");
}
loadPage();

await Promise.all([fetchProducts(), fetchCart()]);

// Promises & Callbacks
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
