
- await必须要在async声明的函数体内，不能在嵌套的函数内
- await命令后可以是Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）

----------------------------------


async function eee () {
	function a() {
		return new Promise(function (resolve,reject) {
			setTimeout(function () {
				console.log('a');
				resolve('a');
			},1000);
		})
	}
	var e1 = await a();
	function b() {
		return new Promise(function (resolve,reject) {
			setTimeout(function () {
				console.log('b');
				resolve(e1+'b');
			},1000);
		})
	}
	var e2 = await b(); 
	function c() {
		return new Promise(function (resolve,reject) {
			setTimeout(function () {
				console.log('c');
				resolve(e2+'c');
			},1000);
		})
	}
	var e3 = await c();
	return e3;
}

eee().then(function (data) {
	console.log(data);
});


-----------------------------------


async function ajax(num) {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			console.log(num)
			resolve(num+1);
		}, 1000)
	})
}

async function run () {
	let res1 = await ajax(1);
	let res2 = await ajax(res1);
	let res3 = await ajax(res2);
	console.log(res3)
}

run();



