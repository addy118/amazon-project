import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend from "../scripts/utils/weekend.js";

export const deliveryOptions = [
	{
		id: '1',
		days: 7,
		priceCents: 0
	}, {
		id: '2',
		days: 3,
		priceCents: 499
	}, {
		id: '3',
		days: 1,
		priceCents: 999
	}
]

export function getDeliveryOption(deliveryOptionId) {
	let deliveryOption
	deliveryOptions.forEach(option => {
		if (option.id === deliveryOptionId) {
			deliveryOption = option;
		}
	});
	return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
	let deliveryDate = dayjs()
	let remainingDays = deliveryOption.days
	
	while (remainingDays > 0) {
		deliveryDate = deliveryDate.add(1, 'day')
		if (!isWeekend(deliveryDate)) {
			remainingDays--;
		}
	}
	
	return deliveryDate.format('dddd, MMMM D');
}