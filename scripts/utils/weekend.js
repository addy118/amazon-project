export default function isWeekend(date) {
	if (date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday') {
		console.log("It's a weekend!")
		return true;
	} else {
		console.log("It's not a weekend!")
		return false;
	}
}