import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/header.js";
import '../data/cartClass.js';

renderCheckoutHeader()
renderOrderSummary();
renderPaymentSummary();