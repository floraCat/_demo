var AAA = {
	'a' : 111,
	'b' : 222,
	'fun1' : () => {
		return 'AAA fun1'
	}
	
}

var BBB = new Proxy(AAA,{
	get (target, key, receiver) {
		if (key === 'fun1') {
			return function () {
				return 'BBB fun1'
			}
		}
		return Reflect.get(target,key,receiver);
	},
	set (target, key, receiver) {
		console.log('--set--');
		return Reflect.set(target,key,receiver);
	},
	has (target,key) {
		console.log('--in--');
		return key in target;
	}
});

console.log(BBB.fun1())
// console.log('a' in BBB)
// BBB.b = 333;
