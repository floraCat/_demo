console.log('进入connt.js')
var countNum = 0;
var sInt = setInterval(function () {
	if (countNum >= 1000) {
		postMessage(countNum);
		clearInterval(sInt);
	}
	countNum++;
},1);