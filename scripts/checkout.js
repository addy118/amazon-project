import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/header.js";
import {loadProducts} from "../data/products.js";
// import '../data/car.js';
// import '../data/backend-practice.js';

loadProducts(renderCheckout)

function renderCheckout() {
	renderCheckoutHeader()
	renderOrderSummary();
	renderPaymentSummary();
}
