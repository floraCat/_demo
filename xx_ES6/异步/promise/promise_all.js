function p () {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			resolve('p')
		}, 1000)
	});
}

function a () {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			resolve('a');
		},2000);
	});
}

function b () {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			resolve('b')
		},3000);
	});
}


Promise
.all([p(), a(), b()])
.then(function(results){
	console.log('三个Promise实例都已完成，结果为：')
    console.log(results);
});