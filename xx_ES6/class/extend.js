class AAA {
	constructor() {
		this.a = 111;
		this.b = 222;
	}
	fun1 () {
		console.log('old fun1');
	}
}

class BBB extends AAA {
	constructor() {
		super();
	}
	fun1 () {
		console.log('new fun1');
	}
};

var CCC = new BBB();

CCC.fun1()