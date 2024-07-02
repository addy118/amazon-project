import {cart, addToCart, loadCart} from "../../../data/cart.js";

export function testAddToCart() {
	describe('addToCart', () => {
		it('adds existing product', () => {
			spyOn(localStorage, 'setItem');
			spyOn(localStorage, 'getItem').and.callFake(() => {
				return JSON.stringify([{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1'
				}]);
			});
			loadCart()
			
			addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
			expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
			expect(cart.length).toEqual(1)
			expect(cart[0].quantity).toEqual(2)
			expect(localStorage.setItem).toHaveBeenCalled(1)
		});
		
		it('adds a new product', () => {
			spyOn(localStorage, 'setItem');
			spyOn(localStorage, 'getItem').and.callFake(() => {
				return JSON.stringify('[]')
			})
			loadCart()
			
			addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
			expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
			expect(cart.length).toEqual(1)
			expect(cart[0].quantity).toEqual(1)
			expect(localStorage.setItem).toHaveBeenCalled(1)
		});
	});
}