import {formatCurrency} from "../money.js";

export function testFormatCurrency() {
	console.group('test suite: formatCurrency')
	
	console.log('converts cents to dollars')
	if (formatCurrency(2095) === '20.95') {
		console.log('passed')
	} else {
		console.log('failed')
	}
	
	console.log('works with 0')
	if (formatCurrency(0) === '0.00') {
		console.log('passed')
	} else {
		console.log('failed')
	}
	
	console.group('rounds up to the nearest cent')
	console.log('rounds up the greater number')
	if (formatCurrency(2000.5) === '20.01') {
		console.log('passed')
	} else {
		console.log('failed')
	}
	
	console.log('rounds up the smaller number')
	if (formatCurrency(2000.4) === '20.00') {
		console.log('passed')
	} else {
		console.log('failed')
	}
	console.groupEnd()
	
	console.groupEnd()
}