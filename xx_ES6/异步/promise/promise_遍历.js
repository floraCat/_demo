var _len = 3;

var sto = function (index) {
	return new Promise(function (resolve,reject) {
		setTimeout(function () {
			console.log(index);
			resolve();
		}, 2000);
	});
		
}

function act(index) {
	sto(index).then(function () {
		index ++;
		if (index < _len) {
			act(index);
		}
	});
}

act(0);



