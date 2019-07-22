function* getStockPrice(stock) {
	while (true) {
	    let x = Math.random()*100;
		yield x;
	}
}

var priceGenerator = getStockPrice('IBM');

var limitPrice = 15;

var price = 100;

while (price > limitPrice){
	price = priceGenerator.next().value;
	console.log(`the generator return ${price}`);
};

console.log(`buying at ${price}`);
