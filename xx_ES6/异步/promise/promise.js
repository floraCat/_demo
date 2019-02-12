function p () {
	return new Promise(function (resolve,reject) {
		var _p = 10;
		console.log('ppp->' + _p)
		resolve(_p)
	});
}

function a (p) {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			var _a = p + 1;
			console.log('aaa->' + _a)
			resolve(_a);
		},1000);
	});
}

function b (a) {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			var _b = a + 1;
			console.log('bbb->' + _b)
			resolve(_b)
		},1000);
	});
}

function c (b) {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			if (b <= 10) {
				var _c = b + 1
				resolve('结果为'+_c)
			} else {
				reject('结果大于10')
			}
		}, 1000)
	})
}


p()
.then(function (data) {
	return a(data);
})
.then(function (data) {
	return b(data);
})
.then(function (data) {
	return c(data)
})
// .then(
// 	function (data) {
// 		console.log('resolve->' + data);
// 	},
// 	function (reason) {
// 		console.log('reject->' + reason);
// 	}
// );
.then(function (data) {
	console.log('resolve->' + data);
})
.catch(function (reason) {
	console.log('reject->' + reason);
})








