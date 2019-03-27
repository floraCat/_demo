
var _x = function () {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			console.log(11111);
			resolve();
		}, 3000);
	});
}

if (true) {
	_x().then(function () {
		console.log(2222);
	});
}

